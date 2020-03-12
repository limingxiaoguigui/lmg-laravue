// 引入Vue
import Vue from 'vue';
// 引入cookie
import Cookies from 'js-cookie';
// 引入element
import ElementUI from 'element-ui';
// 引入App.vue
import App from './views/App';
// 引入store状态管理
import store from './store';
// 引入路由
import router from '@/router';
// 引入语言包
import i18n from './lang'; // Internationalization
// 引入图标
import '@/icons'; // icon
// 引入权限控制
import '@/permission';
// 引入过滤js
import * as filters from './filters'; // global filters

// 使用Vue
Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value),
});

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false;

// 挂载
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App),
});
