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

export default {
  input: "src/index.ts",
  output: {
    format: "esm",
    dir: "dist/"
  },
  // preserveSymlinks is required to prevent rollup from expanding references to packages in yarn workspace to relative paths
  preserveSymlinks: true,
  external: (depPath) => {
    // exclude files in exclusionList from the build pipeline
    return externalPaths.some((ext) => {
      if (typeof ext === "string") {
        return depPath === ext;
      } else if (ext instanceof RegExp) {
        return ext.test(depPath);
      } else {
        return false;
      }
    });
  },
  plugins: [
    nodeResolve(),
    typescript(),
    terser() // enable terser if you want to minify your code */
  ]
};