// 引入Vue
import Vue from 'vue';
// 引入图标
import SvgIcon from '@/components/SvgIcon';
// 全局注册
Vue.component('svg-icon', SvgIcon);

const requireAll = requireContext => requireContext.keys().map(requireContext);

const req = require.context('./svg', false, /\.svg$/);
// 获取图标数组
requireAll(req);
