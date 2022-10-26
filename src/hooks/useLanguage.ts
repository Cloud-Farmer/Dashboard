import { useCallback, useState } from 'react';
import { LanguageHookType, LanguageType } from '../type';
import { getCookie, setCookie } from '../util/cookie';

const defaultLanguage: LanguageType = 'en';

const useLanguage = (): LanguageHookType => {
  const [data, setData] = useState<LanguageType>(defaultLanguage);

  const getLanguageCookie =
    getCookie('language') === 'en' || getCookie('language') === 'ko'
      ? getCookie('language')
      : defaultLanguage;

  if (getLanguageCookie !== data) setData(getLanguageCookie);
  const handler = useCallback(
    (lang?: LanguageType) => {
      if (lang !== undefined) {
        setData(lang);
        lang && setCookie('language', lang);
      } else {
        setData(data);
      }
    },
    [data],
  );
  return [data, handler];
};

export default useLanguage;
