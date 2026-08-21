#!/bin/sh
# Vendor TensorFlow.js as a single self-contained ES module under libraries/tfjs/.
#
# The app runs without a build step, but TF.js cannot be vendored by copying files. Its ESM
# distributions import each other through bare specifiers ("@tensorflow/tfjs-core", "seedrandom"),
# which a browser can only resolve via an import map -- and import maps are not available in worker
# scopes, which is exactly where inference runs. Bundling resolves every specifier ahead of time and
# yields one file that a module worker can import directly.
#
# Bundles tfjs-core, the backends, and tfjs-converter. The converter package is what provides
# loadGraphModel, which worker/model.js uses to run the graph model produced by
# tensorflowjs_converter (model/exp3multif0_tfjs/). tfjs-layers is not needed: the model is a
# graph model, not a layers model.

set -e

LIBRARY_DIR="libraries/tfjs"
BUILD_DIR="libraries/.tfjs-build"
TFJS_VERSION="4.22.0"

if [ -f "$LIBRARY_DIR/tfjs.js" ]; then
    echo "TensorFlow.js already vendored in $LIBRARY_DIR, skipping."
    echo "Delete $LIBRARY_DIR to force a rebuild."
    exit 0
fi

mkdir -p "$BUILD_DIR" "$LIBRARY_DIR"

echo "Installing TensorFlow.js $TFJS_VERSION..."
cd "$BUILD_DIR"
cat > package.json <<EOF
{
  "name": "tfjs-bundle",
  "private": true,
  "type": "module"
}
EOF

npm install --no-audit --no-fund --silent \
    "@tensorflow/tfjs-core@$TFJS_VERSION" \
    "@tensorflow/tfjs-converter@$TFJS_VERSION" \
    "@tensorflow/tfjs-backend-webgl@$TFJS_VERSION" \
    "@tensorflow/tfjs-backend-webgpu@$TFJS_VERSION" \
    "@tensorflow/tfjs-backend-cpu@$TFJS_VERSION" \
    esbuild

# Importing a backend package registers it with the core engine as a side effect; the app then
# selects one with tf.setBackend(). The CPU backend is included as a correctness fallback only --
# it is far too slow for this model to be usable (see PLAN.md section 2.1).
cat > entry.js <<'EOF'
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-webgpu';
export * from '@tensorflow/tfjs-core';
// loadGraphModel / GraphModel, for the tensorflowjs_converter output. No name collisions with
// core's exports.
export * from '@tensorflow/tfjs-converter';
EOF

echo "Bundling..."
./node_modules/.bin/esbuild entry.js \
    --bundle \
    --format=esm \
    --target=es2020 \
    --minify \
    --legal-comments=none \
    --outfile=tfjs.js

cd - > /dev/null

cp "$BUILD_DIR/tfjs.js" "$LIBRARY_DIR/tfjs.js"
cat > "$LIBRARY_DIR/README.md" <<EOF
TensorFlow.js $TFJS_VERSION, bundled from @tensorflow/tfjs-core plus the cpu, webgl and webgpu
backends by ../../build_libraries.sh. Do not edit; re-run that script to regenerate.
EOF

echo "Wrote $LIBRARY_DIR/tfjs.js ($(du -h "$LIBRARY_DIR/tfjs.js" | cut -f1))."
