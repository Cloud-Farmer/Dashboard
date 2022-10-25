import { getCookie, setCookie } from './cookie';

const defaultLanguage = 'en';

const setLanguage = (lang: 'en' | 'ko') => setCookie('language', lang);

const getLanguage = () => {
  const lang = getCookie('language');
  return lang === 'en' || lang === 'ko' ? lang : 'en';
};

export { setLanguage, getLanguage };
