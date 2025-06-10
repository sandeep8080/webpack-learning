const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // To extract the CSS into a new chunk but this file is not optimized and is same as the origin css file.
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // Use to minimize the above CSS file
const TerserPlugin = require("terser-webpack-plugin"); // To minimize the js files
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin"); // Plugin to treeshake CSS
const { DefinePlugin } = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer"); // Plugin to analyze the bundle size

module.exports = (args) => {
  console.log("Building for environment:", args?.appEnv);
  return {
    entry: "./src/index.tsx", // Entry point of the application
    output: {
      filename: "[name].[contenthash].js", // Output file name with content hash for cache busting
      clean: true, // Clean the output directory before emit
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
        {
          test: /\.tsx?$/,
          use: "ts-loader",
        },
      ],
    },
    optimization: {
      minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
      // minimize: true, // To minimize the files in Development too.
      runtimeChunk: "single", // Create a runtime chunk to optimize caching
      // This creates a separate chunk for the runtime code, which can help with caching and performance.
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: "all",
            name: "vendors",
            test: /[\\/]node_modules[\\/]/,
          },
        },
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./src/index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
      }),
      new PurgeCSSPlugin({
        paths: ["./src/index.html", "./src/index.tsx"],
      }),
      new DefinePlugin({
        "process.env.APP_ENV": JSON.stringify(args?.appEnv || "dev"),
      }),
      args?.analyze ? new BundleAnalyzerPlugin() : null,
    ],
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
  };
};
