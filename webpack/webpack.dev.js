const { merge } = require("webpack-merge");
const common = require("./webpack.common");

// TODO: For merge the nested configs refer docs: https://www.npmjs.com/package/webpack-merge

module.exports = merge(common, {
  devServer: {
    hot: true,
    open: true,
    port: 3000,
    static: ["src"],
  },
  mode: "development",
});
