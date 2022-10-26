import { useCallback, useState } from 'react';
import { getCookie, setCookie } from '../util/cookie';

type Lang = 'en' | 'ko';
type LangInputProps = [Lang, (lang: Lang) => void];

const defaultLanguage: Lang = 'en';

const useLanguage = (): LangInputProps => {
  const [data, setData] = useState<Lang>(defaultLanguage);

  const getLanguageCookie =
    getCookie('language') === 'en' || getCookie('language') === 'ko'
      ? getCookie('language')
      : defaultLanguage;

  if (getLanguageCookie !== data) setData(getLanguageCookie);
  const handler = useCallback(
    (lang: Lang) => {
      setData(lang);
      setCookie('language', lang);
      console.log('language change: ' + lang);
    },
    [data],
  );
  return [data, handler];
};

export default useLanguage;
