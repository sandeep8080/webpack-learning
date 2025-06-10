const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = (args) =>
  merge(common(args), {
    mode: "production",
  });
