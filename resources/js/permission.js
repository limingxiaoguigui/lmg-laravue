// 引入路由
import router from './router';
// 引入状态管理
import store from './store';
// 引入消息弹窗
import { Message } from 'element-ui';
// 引入进度条
import NProgress from 'nprogress';
// 进度条样色
import 'nprogress/nprogress.css';
// 获取cookie中的token
import { getToken } from '@/utils/auth';
// 获取页面标题
import getPageTitle from '@/utils/get-page-title';
// 进度条配置
NProgress.configure({ showSpinner: false });
// 不进行重定向的白名单列表
const whiteList = ['/login', '/auth-redirect'];
// 路由前置导航

router.beforeEach(async (to, from, next) => {
  // 开启进度条
  NProgress.start();
  // 设置页面标题
  document.title = getPageTitle(to.meta.title);

  // 判断用户是否登录过
  const hasToken = getToken();

  if (hasToken) {
    if (to.path === '/login') {
      // 已经登录过且路由为login,直接跳转至首页
      next({ path: '/' });
      // 进度结束
      NProgress.done();
    } else {
      // 确定用户是否通过getInfo获得了他的权限角色
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        // 有角色就继续
        next();
      } else {
        try {
          // 获取用户信息
          // 注意: 角色必须为一个数组对象: ['admin'] 或者['manager','editor']
          const { roles, permissions } = await store.dispatch('user/getInfo');
          // 根据角色生成可访问路由映射
          // const accessRoutes = await store.dispatch('permission/generateRoutes', roles, permissions);
          store
            .dispatch('permission/generateRoutes', { roles, permissions })
            .then(response => {
              // 动态添加可访问路由
              router.addRoutes(response);

              // 破解方法，以确保addRoutes是完整的
              // 设置replace: true，这样导航就不会留下历史记录
              next({ ...to, replace: true });
            });
        } catch (error) {
          // 删除令牌，进入登录页面重新登录
          await store.dispatch('user/resetToken');
          Message.error(error || 'Has Error');
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.matched[0] ? to.matched[0].path : '') !== -1) {
      // 在免费登录白名单，直接去
      next();
    } else {
      // 其他没有访问权限的页面被重定向到登录页面。
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // 进度条结束
  NProgress.done();
});
