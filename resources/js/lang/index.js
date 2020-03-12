import Vue from 'vue';
// 引入语言包
import VueI18n from 'vue-i18n';
// 引入cookies
import Cookies from 'js-cookie';
// 引入饿了么相关语言包
import elementEnLocale from 'element-ui/lib/locale/lang/en'; // element-ui lang
import elementRuLocale from 'element-ui/lib/locale/lang/ru-RU'; // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'; // element-ui lang
import elementViLocale from 'element-ui/lib/locale/lang/vi'; // element-ui lan
// 引入本地语言包
import enLocale from './en';
import ruLocale from './ru';
import zhLocale from './zh';
import viLocale from './vi';

Vue.use(VueI18n);

const message = {
  en: {
    ...enLocale,
    ...elementEnLocale,
  },
  ru: {
    ...ruLocale,
    ...elementRuLocale,
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale,
  },
  vi: {
    ...viLocal,
    ...elementViLocale,
  },
};

// 获取语言
export function getLanguage() {
  const chooseLanguage = Cookies.get('language');
  if (chooseLanguage) {
    return chooseLanguage;
  }
  // 如果没选择语言
  const language = (
    navigator.language || navigator.browserLanguage
  ).toLowerCase();
  const locales = Object.keys(messages);
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale;
    }
  }
  return 'zh';
}

const i18n = new VueI18n({
  // 设置本地
  locale: getLanguage(),
  messages,
});

export default i18n;
