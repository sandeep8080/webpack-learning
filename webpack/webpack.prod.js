const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.export = merge(common, {
  mode: "production",
});
