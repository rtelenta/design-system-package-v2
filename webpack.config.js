const path = require("path");

module.exports = {
  entry: "./src/components/",
  mode: "production",
  module: {
    rules: [
      {
        test: /.tsx?$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"],
          ignore: ["src//**/*.test.tsx", "src//**/*.stories.tsx"],
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "index.js",
    library: "LIB",
    libraryTarget: "module",
    path: path.resolve(__dirname, "out"),
  },
};
