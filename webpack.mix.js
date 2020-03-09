//引入打包配置
const config = require("./webpack.config");
//编译资源
const mix = require("laravel-mix");
//编译资源规则
require("laravel-mix-eslint");
//加载js
function resolve(dir) {
  return path.join(__dirname, "/resources/js", dir);
}
//编译监听
Mix.listen("configReady", webpackConfig => {
  // Add "svg" to image loader test
  const imageLoaderConfig = webpackConfig.module.rules.find(
    rule =>
      String(rule.test) ===
      String(/(\.(png|jpe?g|gif|webp)$|^((?!font).)*\.svg$)/)
  );
  imageLoaderConfig.exclude = resolve("icons");
});
//自定义webpack配置
mix.webpackConfig(config);

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .js("resources/js/app.js", "public/js")
  //提取库使得app.js和vendor.js不重复
  .extract([
    "vue",
    "axios",
    "vuex",
    "vue-router",
    "vue-i18n",
    "element-ui",
    "echarts",
    "highlight.js",
    "sortablejs",
    "dropzone",
    "xlsx",
    "tui-editor",
    "codemirror"
  ])
  //配置选项
  .options({
    processCssUrls: false
  })
  //引入node-sass
  .sass("resources/js/styles/index.scss", "public/css/app.css", {
    implementation: require("node-sass")
  });

if (mix.inProduction()) {
  mix.version();
} else {
  //是否使用规则检测
  if (process.env.LARAVUE_USE_ESLINT === "true") {
    mix.eslint();
  }
  // Development settings
  mix.sourceMaps().webpackConfig({
    //原始代码
    devtool: "cheap-eval-source-map" // Fastest for development
  });
}
