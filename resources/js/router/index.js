// 引入vue
import Vue from 'vue';
// 引入vue-router
import Router from 'vue-router';

/**
 * Layzloading会创建很多文件，而且编译速度很慢，所以最好不要在开发设备上使用lazyloading。
 * 这就需要引入babel-plugin-syntax-dynamic-import
 */

Vue.use(Router);

// 布局
import Layout from '@/layout';

// 引入相关模块的路由
import elementUiRoutes from './modules/element-ui';
import componentRoutes from './modules/components';
import chartsRoutes from './modules/charts';
import tableRoutes from './modules/table';
import adminRoutes from './modules/admin';
import nestedRoutes from './modules/nested';
import errorRoutes from './modules/error';
import excelRoutes from './modules/excel';
import permissionRoutes from './modules/permission';

/**
 * 子菜单只在children.length>=1时出现
 **/

/**
*                                子菜单只在children.length>=1时出现
* hidden: true                   如果'hidden:true'，则不会显示在侧边栏中(默认为false);
* alwaysShow: true               如果设置为真，将始终显示根菜单，无论它的子路由长度
*                                如果不设置常显，只能有一条以上的路由下的孩子，它将成为嵌套模式，否则不显示根菜单
*
* redirect: noredirect           如果“重定向:noredirect”将不会在面包屑中重定向
* name:'router-name'             该名称由<keep-alive>(必须设置!!)
* meta : {
    roles: ['admin', 'editor']   仅对这些角色可见
    permissions: ['view menu zip', 'manage user'] 仅对这些权限可见
    title: 'title'               在子菜单和面包屑中显示名称(推荐设置)
    icon: 'svg-name'             图标显示在侧栏中
    noCache: true                如果为真，页面将不会被缓存(默认为假)
    breadcrumb: false            如果为假，则该项将隐藏在breadcrumb中(默认为真)
    affix: true                  如果为真，则标记将附加在标记视图中
  }
**/
// 常规路由
export const constantRoutes = [
  {
    // 重定向路由组件
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index'),
      },
    ],
  },
  {
    // 登录路由组件
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    // 登录用户重定向路由组件
    path: '/auth-redirect',
    component: () => import('@/views/login/AuthRedirect'),
    hidden: true,
  },
  {
    // 404路由组件
    path: '/404',
    redirect: { name: 'Page404' },
    component: () => import('@/views/error-page/404'),
    hidden: true,
  },
  {
    // 401路由组件
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true,
  },
  {
    // 仪表盘路由组件
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: false },
      },
    ],
  },
  {
    // 文档路由组件
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'documentation', icon: 'documentation', noCache: true },
      },
    ],
  },
  {
    // 向导路由组件
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true },
      },
    ],
  },
  // 饿了么ui路由组件
  elementUiRoutes,
];

// 动态路由
export const asyncRoutes = [
  // 权限路由组件
  permissionRoutes,
  // 组件路由组件
  componentRoutes,
  // 数据图形路由组件
  chartsRoutes,
  // 前套路由组件
  nestedRoutes,
  // 表格路由组件
  tableRoutes,
  // 管理员路由组件
  adminRoutes,
  {
    // 主题组件
    path: '/theme',
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'theme', icon: 'theme' },
      },
    ],
  },
  {
    // 剪贴板路由组件
    path: '/clipboard',
    component: Layout,
    redirect: 'noredirect',
    meta: { permissions: ['view menu clipboard'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: {
          title: 'clipboardDemo',
          icon: 'clipboard',
          roles: ['admin', 'manager', 'editor', 'user'],
        },
      },
    ],
  },
  // 错误路由组件
  errorRoutes,
  excelRoutes,
  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    meta: { title: 'zip', icon: 'zip', permissions: ['view menu zip'] },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip'),
        name: 'ExportZip',
        meta: { title: 'exportZip' },
      },
    ],
  },
  {
    // pdf路由组件
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    meta: { title: 'pdf', icon: 'pdf', permissions: ['view menu pdf'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf'),
        name: 'Pdf',
        meta: { title: 'pdf' },
      },
    ],
  },
  {
    // PDF下载路由组件
    path: '/pdf/download',
    component: () => import('@/views/pdf/Download'),
    hidden: true,
  },
  {
    // 语言包路由组件
    path: '/i18n',
    component: Layout,
    meta: { permissions: ['view menu i18n'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/i18n'),
        name: 'I18n',
        meta: { title: 'i18n', icon: 'international' },
      },
    ],
  },
  {
    // 外链路由组件
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/tuandm/laravue',
        meta: { title: 'externalLink', icon: 'link' },
      },
    ],
  },
  // 通配路由组件
  { path: '*', redirect: '/404', hidden: true },
];

// 创建路由
const createRouter = () =>
  new Router({
    // mode: 'history', // 需要服务支持
    scrollBehavior: () => ({ y: 0 }),
    base: process.env.MIX_LARAVUE_PATH,
    // 创建常规路由
    routes: constantRoutes,
  });

const router = createRouter();

// 重置路由
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
