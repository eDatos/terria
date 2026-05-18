import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

// Paths to exclude from the bundle
const externalPaths = [
  /^.*\/node_modules\/.*$/,
  /^terriajs-cesium\/.*$/,
  /^.*@babel\/runtime.*$/,
  /^.*\/terriajs\/.*$/
];

/** Rollup plugin that resolves terriajs bare specifiers as external modules.
 *  Returns { id, external: true } so rollup writes the bare specifier in the
 *  ESM output instead of a relative path. This ensures webpack can resolve
 *  them correctly regardless of the CWD used during the rollup build.
 */
const terriaExternalPlugin = {
  name: "terriajs-external",
  resolveId(id) {
    if (id.startsWith("terriajs/lib/")) {
      return { id: id.replace(/\.ts$/, ""), external: true };
    }
    return null;
  }
};

export default {
  input: "src/index.ts",
  output: {
    format: "esm",
    dir: "dist/"
  },
  // preserveSymlinks is required to prevent rollup from expanding references to packages in yarn workspace to relative paths
  preserveSymlinks: true,
  external: (depPath) => {
    // Normalize to forward slashes so regexes work on Windows
    const normalizedPath = depPath.replace(/\\/g, "/");
    // Never treat plugin's own source files as external (happens when yarn
    // runs the build from the node_modules symlink and the resolved entry
    // path contains /node_modules/)
    if (normalizedPath.includes("/terriajs-plugin-edatos/src/")) return false;
    // exclude files in exclusionList from the build pipeline
    return externalPaths.some((ext) => {
      if (typeof ext === "string") {
        return normalizedPath === ext;
      } else if (ext instanceof RegExp) {
        return ext.test(normalizedPath);
      } else {
        return false;
      }
    });
  },
  plugins: [
    terriaExternalPlugin,
    nodeResolve(),
    typescript(),
    terser() // enable terser if you want to minify your code */
  ]
};