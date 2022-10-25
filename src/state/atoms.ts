import { atom } from 'recoil';
import { getCookie } from '../util/cookie';

const chartTypeState = atom({
  key: 'charType',
  default: 'area',
});

const lanState = atom({
  key: 'language',
  default: 'en',
});

export { chartTypeState, lanState };
