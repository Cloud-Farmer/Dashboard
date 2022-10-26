import { atom } from 'recoil';

const chartTypeState = atom({
  key: 'charType',
  default: 'area',
});

export { chartTypeState };
