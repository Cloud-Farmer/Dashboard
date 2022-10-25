import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { lanState } from '../state/atoms';
import { getCookie, setCookie } from '../util/cookie';

type Lang = 'en' | 'ko';

const defaultLanguage: Lang = 'en';

const setLanguageCookie = (lang: Lang) => setCookie('language', lang);

const getLanguageCookie: Lang =
  getCookie('language') === 'en' || getCookie('language') === 'ko'
    ? getCookie('language')
    : defaultLanguage;
    
const useLanguage = () => {
  const [data, setData] = useRecoilState(lanState);
  if (getLanguageCookie !== data) setData(getLanguageCookie);
  const handler = useCallback(
    (lang: Lang) => {
      setData(lang);
      setLanguageCookie(lang);
    },
    [data],
  );
  return [data, handler];
};

export default useLanguage;
