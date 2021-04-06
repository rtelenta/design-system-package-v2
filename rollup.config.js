import babel from "rollup-plugin-babel";
import external from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import excludeDependenciesFromBundle from "rollup-plugin-exclude-dependencies-from-bundle";

import pkg from "./package.json";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      sourcemap: true,
    },
  ],
  plugins: [
    excludeDependenciesFromBundle({
      peerDependencies: true,
      dependencies: true,
    }),
    external(),
    resolve({ extensions }),
    commonjs({
      include: ["node_modules/**"],
      namedExports: {
        "node_modules/react/react.js": [
          "Children",
          "Component",
          "PropTypes",
          "createElement",
        ],
        "node_modules/react-dom/index.js": ["render"],
      },
    }),
    babel({
      extensions,
      include: ["src/**/*"],
      presets: ["@babel/preset-typescript", "@babel/preset-react"],
    }),
  ],
};
