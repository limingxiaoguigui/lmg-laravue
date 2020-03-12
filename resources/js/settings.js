// 引入全局样色
import variables from '@/styles/element-variables.scss';

export default {
  title: 'Laravue',
  theme: variables.theme,
  // 是否显示设置右侧面板
  showSettings: true,
  // 是否需要tagsView
  tagsView: true,
  // 是否修复页眉
  fixedHeader: false,
  // 是否在侧边栏显示徽标
  sidebarLogo: false,
  // 需要显示err日志组件。
  // 默认值仅用于生产环境
  // 如果你也想在开发中使用它，你可以通过['production'，'development']
  errorLog: 'production',
};
