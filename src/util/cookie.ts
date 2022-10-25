import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const setCookie = (key: string, value: string, option?: object) => {
  return cookies.set(key, value, option);
};

const getCookie = (key: string) => {
  return cookies.get(key);
};

export { setCookie, getCookie };
