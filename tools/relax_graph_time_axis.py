"""Make a converted TF.js graph model accept any number of time frames.

tensorflowjs_converter freezes whatever concrete input shape it was given, so a model exported for
[1, 360, 50, 5] rejects every other width:

    The shape of dict['inputs'] provided in model.execute(dict) must be [1,360,50,5],
    but was [1,360,128,5]

That is a problem for this app rather than a property of the network. A fixed 50 forces the
analysis to advance in 26-frame steps -- the model's time receptive field is 25 frames, so only the
middle 26 of each 50 are context-complete -- which nearly doubles the frames pushed through the GPU.

The graph itself is entirely shape-agnostic: 16 _FusedConv2D, Mul/AddV2 pairs for the batch norms, a
ConcatV2, a Sigmoid and a Squeeze on axis 3. No Reshape, no Pack, no baked dimensions anywhere; the
frozen width appears only in the two Placeholder nodes. TF.js's own shape check treats -1 as a
wildcard (`shape[index] === -1 || shape[index] === dim`), so rewriting those Placeholders to -1 on
the time axis is sufficient and requires no re-export.

The rewritten graph is written next to the original as a second model.json variant. The weight
manifest is left untouched and its paths are relative to the containing directory, so both variants
share one copy of the weights and the original file is not modified.

Usage:
    python tools/relax_graph_time_axis.py model/exp3multif0_tfjs/model.json
"""

import argparse
import copy
import json
import os

# (batch, frequency bin, time frame, harmonic) -- only the time axis becomes dynamic. Leaving the
# others fixed keeps the shape check as a real guard against feeding a wrongly laid out tensor.
TIME_AXIS = 2


def relax_dim_list(dims, label, axis=TIME_AXIS):
    """Set `dims[axis]` to -1, returning whether anything changed."""
    if len(dims) != 4:
        raise SystemExit(f"{label}: expected a rank-4 shape, got {len(dims)} dimensions")
    before = dims[axis].get("size")
    if before in ("-1", -1):
        return False
    dims[axis]["size"] = "-1"
    print(f"  {label}: time axis {before} -> -1")
    return True


def main():
    parser = argparse.ArgumentParser(description=__doc__,
                                     formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("model_json", help="Path to the converted model.json")
    parser.add_argument("--output", default=None,
                        help="Output filename (default: <stem>-dynamic.json beside the input)")
    args = parser.parse_args()

    source = os.path.abspath(os.path.expanduser(args.model_json))
    with open(source) as handle:
        model = json.load(handle)

    output = args.output
    if output is None:
        stem, extension = os.path.splitext(os.path.basename(source))
        output = f"{stem}-dynamic{extension}"
    # Must sit beside the original: weightsManifest paths are resolved relative to model.json, and
    # sharing them is the point of not re-exporting.
    destination = os.path.join(os.path.dirname(source), os.path.basename(output))
    if destination == source:
        raise SystemExit("refusing to overwrite the original model.json")

    relaxed = copy.deepcopy(model)
    changes = 0

    # The Placeholder nodes are what TF.js actually validates against.
    placeholders = [node for node in relaxed["modelTopology"]["node"]
                    if node["op"] == "Placeholder"]
    if not placeholders:
        raise SystemExit("no Placeholder nodes found; is this a graph model?")
    print(f"placeholders ({len(placeholders)}):")
    for node in placeholders:
        dims = node["attr"]["shape"]["shape"]["dim"]
        changes += relax_dim_list(dims, node["name"])

    # The signature is advisory, but it is what model.inputs reports, so keep it consistent.
    signature = relaxed.get("signature") or {}
    if signature.get("inputs"):
        print("signature inputs:")
        for name, spec in signature["inputs"].items():
            dims = spec.get("tensorShape", {}).get("dim")
            if dims:
                changes += relax_dim_list(dims, name)
    if signature.get("outputs"):
        print("signature outputs:")
        for name, spec in signature["outputs"].items():
            dims = spec.get("tensorShape", {}).get("dim")
            # The output is (batch, bin, frame) after the Squeeze, so its time axis is the last.
            if dims and len(dims) == 3:
                before = dims[-1].get("size")
                if before not in ("-1", -1):
                    dims[-1]["size"] = "-1"
                    print(f"  {name}: time axis {before} -> -1")
                    changes += 1

    # Guard against the assumption that made this safe: any baked dimension elsewhere would break
    # under a different width, and it is better to hear about it now than to get wrong numbers.
    risky = [node["op"] for node in relaxed["modelTopology"]["node"]
             if node["op"] in ("Reshape", "Pack", "Fill", "BroadcastTo")]
    if risky:
        print(f"\nWARNING: graph contains {risky}, which can carry baked shapes. "
              "Verify the relaxed model against the original at the original width.")

    with open(destination, "w") as handle:
        json.dump(relaxed, handle)

    print(f"\nwrote {destination} ({changes} dimension(s) relaxed)")
    print(f"weights shared with the original: "
          f"{[p for group in relaxed['weightsManifest'] for p in group['paths']]}")


if __name__ == "__main__":
    main()
