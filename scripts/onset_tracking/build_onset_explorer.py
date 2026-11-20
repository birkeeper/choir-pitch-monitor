#!/usr/bin/env python3
"""Build a standalone, interactive HTML explorer for onset tracking on Basic Pitch salience maps.

The page shows the salience map with f0 detections (port of worker/notes.js), 1D SORT tracks,
the onset mask and per-track spread. Detection and tracking run in the browser (tracking_core.js)
so the sliders update instantly. Any salience .npz can also be loaded from the page itself
(file picker or drag and drop), so rebuilding is only needed to change the embedded default.

Standard library only.

    python3 scripts/onset_tracking/build_onset_explorer.py [salience.npz] [-o out.html]
"""
import argparse
import base64
import json
import struct
import sys
import zipfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
DEFAULT_NPZ = Path.home() / "Downloads/A-team_start_Vocalicious_distill04_salience.npz"


def npy_shape(archive: zipfile.ZipFile, name: str) -> str:
    """Header of an .npy member, for a sanity check (no numpy needed)."""
    data = archive.read(name)
    length = struct.unpack("<H", data[8:10])[0]
    return data[10:10 + length].decode("latin-1").strip()


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    parser.add_argument("npz", nargs="?", type=Path, default=DEFAULT_NPZ,
                        help="salience .npz to embed as the default (default: %(default)s); "
                             "use --no-embed to build an empty page")
    parser.add_argument("--no-embed", action="store_true", help="do not embed any file")
    parser.add_argument("-o", "--output", type=Path, default=HERE / "onset_explorer.html")
    args = parser.parse_args()

    embedded = None
    if not args.no_embed:
        with zipfile.ZipFile(args.npz) as archive:
            names = archive.namelist()
            if "salience.npy" not in names:
                sys.exit(f"{args.npz}: no 'salience' array (found {names})")
            print(f"salience: {npy_shape(archive, 'salience.npy')}")
        embedded = {"name": args.npz.name, "base64": base64.b64encode(args.npz.read_bytes()).decode()}

    html = (HERE / "template.html").read_text()
    html = html.replace("/*__TRACKING_CORE__*/", (HERE / "tracking_core.js").read_text())
    html = html.replace("/*__EMBEDDED__*/ null", json.dumps(embedded))
    args.output.write_text(html)
    print(f"wrote {args.output} ({args.output.stat().st_size / 1e6:.1f} MB)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
