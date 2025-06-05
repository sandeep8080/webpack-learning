const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // To extract the CSS into a new chunk but this file is not optimized and is same as the origin css file.
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // Use to minimize the above CSS file
const TerserPlugin = require("terser-webpack-plugin"); // To minimize the js files
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin"); // Plugin to treeshake CSS

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "../dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        // When multiple loaders are specified in the use property, webpack applies them from right to left.
        // Each loader in the chain performs a specific task or transformation on the source file and passes the result to the next loader.
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    minimize: true, // To minimize the files in Development too.
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "bundle.css",
    }),
    new PurgeCSSPlugin({
      paths: ["./src/index.html"],
    }),
  ],
};
