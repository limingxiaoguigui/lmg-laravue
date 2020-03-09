//引入path模块
const path = require("path");
//引入wepack插件
const webpack = require("webpack");
//引入分析单页应用插件
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
//加载resources/js下的所有文件
function resolve(dir) {
  return path.join(__dirname, "/resources/js", dir);
}
//node相关信息的全局变量
const rawArgv = process.argv.slice(2);
const args = rawArgv.join(" ");
//当命令行有--report的时候
const report = rawArgv.includes("--report");
//插件
let plugins = [];
//打开分析插件
if (report) {
  plugins.push(
    new BundleAnalyzerPlugin({
      openAnalyzer: true
    })
  );
}
//输出配置
module.exports = {
  resolve: {
    //自动加载相关后缀
    extensions: [".js", ".vue", ".json"],
    //别名
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.join(__dirname, "/resources/js")
    }
  },
  module: {
    //引入icons下的svg文件
    rules: [
      {
        test: /\.svg$/,
        loader: "svg-sprite-loader",
        include: [resolve("icons")],
        options: {
          symbolId: "icon-[name]"
        }
      }
    ]
  },
  //插件
  plugins: plugins
};
