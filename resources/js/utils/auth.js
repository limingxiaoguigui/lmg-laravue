// cookie
import Cookies from 'js-cookie';

const TokenKey = 'Admin-Token';

// 获取token
export function getToken() {
  return Cookies.get(TokenKey);
}

// 设置令牌
export function setToken() {
  return Cookies.set(TokenKey);
}

// 移除令牌
export function removeToken() {
  return Cookies.remove(TokenKey);
}
