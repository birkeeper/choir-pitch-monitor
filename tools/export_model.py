"""Export a multif0-estimation-polyvocals model to a flat weight blob for TensorFlow.js.

Why not `tensorflowjs_converter`: the saved `exp3multif0.keras` ends in
`Lambda(lambda x: K.squeeze(x, axis=3))`, which Keras 3 refuses to deserialise (and, with
`safe_mode=False`, then fails to infer an output shape for). The graph therefore has to be rebuilt
from `models.build_model3()` regardless, and the trailing squeeze is a single line on the JS side.
Once the graph is being rebuilt by hand, a flat blob plus an explicit op list is both simpler and
more predictable than a converter round-trip.

The emitted `manifest.json` is an ordered op list, so `worker/model.js` is a small interpreter
rather than a hard-coded transcription of this particular architecture -- the fine-tuned
checkpoints in the same repo share the architecture and export through the same path.

BatchNormalization is collapsed at export time. Keras computes

    y = gamma * (x - mean) / sqrt(var + eps) + beta

which is an affine map in x, so only `scale = gamma / sqrt(var + eps)` and
`offset = beta - mean * scale` are emitted. That halves the batch-norm weight volume and turns each
batch norm into one fused multiply-add at inference time.

The batch norms are *not* folded into the neighbouring convolutions. They sit after the
convolution's ReLU, so they can only be folded forward into the *next* convolution, and that
transform is not exact under 'same' padding: the padded zeros would have to become the offset value
to stay equivalent. With a (360, 1) kernel over a 360-bin axis the padded region covers most of the
output, so the error would be substantial rather than cosmetic.

Usage (from the polyvocals repo, with its venv active):

    python /path/to/choir-pitch-monitor/tools/export_model.py \
        --repo   ~/Documents/git/multif0-estimation-polyvocals \
        --weights models/exp3multif0.h5 \
        --outdir ~/Documents/git/choir-pitch-monitor/model
"""

import argparse
import hashlib
import json
import os
import subprocess
import sys

import numpy as np


# Order matters: this is the execution order of the graph, and the order weights are written to the
# blob. It mirrors models.build_model3() / models.base_model().
def build_op_list(model):
    """Walk build_model3's structure and emit an ordered op list.

    Returns a list of dicts, each naming its input tensor(s), output tensor and the Keras layer
    supplying its weights. Tensor names are arbitrary labels used only to wire the ops together.
    """
    ops = []

    # `producer` is the name of the Keras layer feeding each batch norm, used to look the batch
    # norm up in map_batchnorm_layers(). For the two input batch norms that is the InputLayer.
    input_layer_names = [tensor._keras_history.operation.name for tensor in model.inputs]

    # Two identical branches: 'a' consumes the HCQT magnitude, 'b' the phase differentials.
    for index, (branch, source) in enumerate((("a", "mag"), ("b", "dphase"))):
        prev = source
        # Each branch opens with a BatchNormalization directly on the input.
        ops.append({"type": "batchnorm", "inputs": [prev], "output": f"{branch}_in_bn",
                    "layer": None, "role": f"input_bn_{branch}",
                    "producer": input_layer_names[index]})
        prev = f"{branch}_in_bn"

        for conv_name, filters, kernel in (
            (f"conv1{branch}", 16, (5, 5)),
            (f"conv2{branch}", 32, (5, 5)),
            (f"conv3{branch}", 32, (5, 5)),
            (f"conv4{branch}", 32, (5, 5)),
            (f"harm1{branch}", 32, (70, 3)),
            (f"harm2{branch}", 32, (70, 3)),
        ):
            ops.append({"type": "conv2d", "inputs": [prev], "output": conv_name,
                        "layer": conv_name, "activation": "relu",
                        "filters": filters, "kernel": list(kernel)})
            ops.append({"type": "batchnorm", "inputs": [conv_name], "output": conv_name + "_bn",
                        "layer": None, "role": f"bn_after_{conv_name}",
                        "producer": conv_name})
            prev = conv_name + "_bn"

    ops.append({"type": "concat", "inputs": ["harm2a_bn", "harm2b_bn"], "output": "concat",
                "layer": None, "axis": -1})

    prev = "concat"
    for conv_name, filters, kernel, activation in (
        ("conv7", 64, (3, 3), "relu"),
        ("conv8", 64, (3, 3), "relu"),
        ("distribution", 8, (360, 1), "relu"),
    ):
        ops.append({"type": "conv2d", "inputs": [prev], "output": conv_name,
                    "layer": conv_name, "activation": activation,
                    "filters": filters, "kernel": list(kernel)})
        ops.append({"type": "batchnorm", "inputs": [conv_name], "output": conv_name + "_bn",
                    "layer": None, "role": f"bn_after_{conv_name}",
                    "producer": conv_name})
        prev = conv_name + "_bn"

    ops.append({"type": "conv2d", "inputs": [prev], "output": "squishy",
                "layer": "squishy", "activation": "sigmoid",
                "filters": 1, "kernel": [1, 1]})
    # The trailing Lambda(squeeze axis=3) is dropped here and applied in JS.
    ops.append({"type": "squeeze", "inputs": ["squishy"], "output": "salience",
                "layer": None, "axis": 3})

    return ops


def map_batchnorm_layers(model):
    """Map each BatchNormalization to the name of the layer feeding it.

    build_model3 leaves the batch norms unnamed, so they have to be identified by position in the
    graph. They cannot be matched by their index in `model.layers`: Keras orders a functional
    model's layers topologically, which interleaves the two parallel branches
    (bn_a_in, bn_b_in, bn_conv1a, bn_conv1b, ...) rather than following construction order. Matching
    on the producing layer is unambiguous, because every batch norm here consumes exactly one
    tensor produced by exactly one layer.

    Returns {producer_layer_name: batchnorm_layer}.
    """
    mapping = {}
    for layer in model.layers:
        if layer.__class__.__name__ != "BatchNormalization":
            continue
        producer = layer.input._keras_history.operation.name
        if producer in mapping:
            raise SystemExit(f"two batch norms both consume '{producer}'; "
                             "the graph is not the shape this exporter assumes")
        mapping[producer] = layer
    return mapping


def main():
    parser = argparse.ArgumentParser(description=__doc__,
                                     formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--repo", required=True,
                        help="Path to the multif0-estimation-polyvocals checkout")
    parser.add_argument("--weights", default="models/exp3multif0.h5",
                        help="Weights file, relative to --repo (default: models/exp3multif0.h5)")
    parser.add_argument("--outdir", required=True, help="Output directory for the TF.js assets")
    parser.add_argument("--architecture", default="build_model3",
                        help="Factory function in models.py (default: build_model3)")
    parser.add_argument("--no-verify", action="store_true",
                        help="Skip replaying the exported op list against the Keras model")
    parser.add_argument("--fixtures", default=None,
                        help="Also write random-input/reference-output fixtures to this directory")
    args = parser.parse_args()

    repo = os.path.abspath(os.path.expanduser(args.repo))
    outdir = os.path.abspath(os.path.expanduser(args.outdir))
    weights_path = os.path.join(repo, args.weights)
    os.makedirs(outdir, exist_ok=True)
    sys.path.insert(0, repo)

    os.environ.setdefault("CUDA_VISIBLE_DEVICES", "")
    import models  # noqa: E402  (needs sys.path and the env var set first)

    model = getattr(models, args.architecture)()
    model.load_weights(weights_path)
    print(f"loaded {args.architecture} with weights {weights_path} "
          f"({model.count_params():,} parameters)")

    ops = build_op_list(model)
    bn_layers = map_batchnorm_layers(model)
    wanted = {op["producer"] for op in ops if op["type"] == "batchnorm"}
    if wanted != set(bn_layers):
        raise SystemExit("batch-norm producers disagree with the model graph\n"
                         f"  only in op list: {sorted(wanted - set(bn_layers))}\n"
                         f"  only in model:   {sorted(set(bn_layers) - wanted)}")

    blob = bytearray()

    def append(array, name):
        """Append a float32 array to the blob, returning its {offset, shape} descriptor."""
        data = np.ascontiguousarray(array, dtype=np.float32)
        descriptor = {"offset": len(blob), "shape": list(data.shape)}
        blob.extend(data.tobytes())
        print(f"  {name:<28} {str(list(data.shape)):<22} {data.nbytes:>9,} bytes")
        return descriptor

    print("weights:")
    for op in ops:
        if op["type"] == "conv2d":
            layer = model.get_layer(op["layer"])
            kernel, bias = layer.get_weights()
            expected = tuple(op["kernel"]) + (kernel.shape[2], op["filters"])
            if kernel.shape != expected:
                raise SystemExit(f"{op['layer']}: expected kernel {expected}, got {kernel.shape}")
            op["weights"] = {
                "kernel": append(kernel, f"{op['layer']}.kernel"),
                "bias": append(bias, f"{op['layer']}.bias"),
            }
        elif op["type"] == "batchnorm":
            layer = bn_layers[op["producer"]]
            gamma, beta, mean, var = layer.get_weights()
            epsilon = float(layer.epsilon)
            # Collapse to a single affine map, as documented in the module docstring.
            scale = gamma / np.sqrt(var + epsilon)
            offset = beta - mean * scale
            op["weights"] = {
                "scale": append(scale, f"{op['role']}.scale"),
                "offset": append(offset, f"{op['role']}.offset"),
            }

    weights_name = "weights.bin"
    with open(os.path.join(outdir, weights_name), "wb") as handle:
        handle.write(blob)

    manifest = {
        "name": args.architecture,
        "description": "Cuesta et al. 2020 multi-F0 salience model, exported for TensorFlow.js",
        "source": {
            "repo": repo,
            "commit": git_commit(repo),
            "weights": args.weights,
            "weights_sha256": sha256(weights_path),
            "architecture": args.architecture,
        },
        "input": {
            # (batch, bins, frames, harmonics) -- see predict_on_audio.get_single_test_prediction
            "layout": "NFTH",
            "bins": 360,
            "harmonics": 5,
            "tensors": ["mag", "dphase"],
        },
        "output": {"layout": "NFT", "tensor": "salience"},
        # Time-axis receptive field, used to size the chunk overlap in worker/model.js.
        # sum(kernel_time - 1) + 1 over the deepest path.
        "time_receptive_field": time_receptive_field(ops),
        "default_threshold": 0.5,
        "weights_file": weights_name,
        "weights_bytes": len(blob),
        "dtype": "float32",
        "ops": ops,
    }
    with open(os.path.join(outdir, "manifest.json"), "w") as handle:
        json.dump(manifest, handle, indent=2)

    print(f"\nwrote {outdir}/manifest.json and {outdir}/{weights_name} "
          f"({len(blob):,} bytes, {len(ops)} ops)")
    print(f"time receptive field: {manifest['time_receptive_field']} frames")

    if not args.no_verify:
        verify(model, manifest, bytes(blob))

    if args.fixtures:
        write_fixtures(model, manifest, os.path.abspath(os.path.expanduser(args.fixtures)))


def write_fixtures(model, manifest, outdir, frames=24):
    """Dump a random input and the Keras output, for tests/test-model.html to check TF.js against.

    This isolates the JS forward pass from the feature extractor: if the salience map is wrong once
    the whole pipeline is wired up, this fixture says whether the model runner or the HCQT port is
    at fault.
    """
    os.makedirs(outdir, exist_ok=True)
    rng = np.random.default_rng(1)
    bins = manifest["input"]["bins"]
    harmonics = manifest["input"]["harmonics"]

    inputs = {}
    for name in manifest["input"]["tensors"]:
        # Roughly the range the real features occupy: magnitude is dB in [-80, 0], dphase is
        # radians in [-pi, pi]. Random data in the right range exercises the same numeric regime.
        if name == "mag":
            values = rng.uniform(-80.0, 0.0, (1, bins, frames, harmonics))
        else:
            values = rng.uniform(-np.pi, np.pi, (1, bins, frames, harmonics))
        inputs[name] = values.astype(np.float32)

    output = model.predict([inputs[name] for name in manifest["input"]["tensors"]], verbose=0)

    files = {}
    for name, values in inputs.items():
        filename = f"model-input-{name}.bin"
        values.tofile(os.path.join(outdir, filename))
        files[name] = filename
    np.asarray(output, dtype=np.float32).tofile(os.path.join(outdir, "model-output.bin"))

    with open(os.path.join(outdir, "model-io.json"), "w") as handle:
        json.dump({
            "description": "Random input and the Keras reference output for build_model3, "
                           "float32 little-endian, C order.",
            "architecture": manifest["source"]["architecture"],
            "weights_sha256": manifest["source"]["weights_sha256"],
            "bins": bins, "frames": frames, "harmonics": harmonics,
            "inputs": files,
            "input_shape": [1, bins, frames, harmonics],
            "output": "model-output.bin",
            "output_shape": list(output.shape),
        }, handle, indent=2)
    print(f"wrote model I/O fixtures to {outdir} ({frames} frames)")


def verify(model, manifest, blob, frames=24):
    """Replay the exported op list and compare against the real model.

    This is what catches a mis-wired op list or a batch norm attached to the wrong layer: those
    produce a perfectly well-formed export that is silently wrong. Convolution itself is not under
    test here (both paths use TensorFlow's), only the graph structure, the weight assignment and
    the batch-norm collapse.
    """
    import tensorflow as tf

    rng = np.random.default_rng(0)
    bins = manifest["input"]["bins"]
    harmonics = manifest["input"]["harmonics"]
    inputs = {
        name: rng.standard_normal((1, bins, frames, harmonics)).astype(np.float32)
        for name in manifest["input"]["tensors"]
    }

    def read(descriptor):
        count = int(np.prod(descriptor["shape"]))
        flat = np.frombuffer(blob, dtype=np.float32, count=count, offset=descriptor["offset"])
        return flat.reshape(descriptor["shape"])

    tensors = dict(inputs)
    for op in manifest["ops"]:
        args = [tensors[name] for name in op["inputs"]]
        if op["type"] == "conv2d":
            kernel = read(op["weights"]["kernel"])
            bias = read(op["weights"]["bias"])
            out = tf.nn.conv2d(args[0], kernel, strides=1, padding="SAME").numpy() + bias
            if op["activation"] == "relu":
                out = np.maximum(out, 0.0)
            elif op["activation"] == "sigmoid":
                out = 1.0 / (1.0 + np.exp(-out))
        elif op["type"] == "batchnorm":
            out = args[0] * read(op["weights"]["scale"]) + read(op["weights"]["offset"])
        elif op["type"] == "concat":
            out = np.concatenate(args, axis=op["axis"])
        elif op["type"] == "squeeze":
            out = np.squeeze(args[0], axis=op["axis"])
        else:
            raise SystemExit(f"verify: unhandled op type '{op['type']}'")
        tensors[op["output"]] = out

    replayed = tensors[manifest["output"]["tensor"]]
    reference = model.predict([inputs[name] for name in manifest["input"]["tensors"]], verbose=0)

    if replayed.shape != reference.shape:
        raise SystemExit(f"verify FAILED: shape {replayed.shape} != {reference.shape}")
    error = float(np.max(np.abs(replayed - reference)))
    # Both paths run the same convolutions in float32; the only difference is the order of the
    # batch-norm arithmetic, so anything above rounding noise means a real structural mismatch.
    print(f"verify: max abs difference vs model.predict = {error:.3e} "
          f"over {replayed.shape} ({'OK' if error < 1e-5 else 'FAILED'})")
    if error >= 1e-5:
        raise SystemExit("verify FAILED: exported op list does not reproduce the model")


def time_receptive_field(ops):
    """Frames of context the deepest path consumes, for sizing chunk overlap.

    The two branches are parallel and identical, so summing every conv's time extent along the
    single-branch path plus the shared head gives the true figure.
    """
    total = 0
    for op in ops:
        if op["type"] == "conv2d" and not op["output"].endswith("b"):
            total += op["kernel"][1] - 1
    return total + 1


def git_commit(repo):
    try:
        return subprocess.check_output(["git", "-C", repo, "rev-parse", "HEAD"],
                                       text=True, stderr=subprocess.DEVNULL).strip()
    except (subprocess.CalledProcessError, FileNotFoundError):
        return "unknown"


def sha256(path):
    digest = hashlib.sha256()
    with open(path, "rb") as handle:
        for block in iter(lambda: handle.read(1 << 20), b""):
            digest.update(block)
    return digest.hexdigest()


if __name__ == "__main__":
    main()
