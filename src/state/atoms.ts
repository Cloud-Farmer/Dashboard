import { atom } from 'recoil';

const chartTypeState = atom({
  key: 'charType',
  default: 'area',
});

const tempDataState = atom({
  key: 'chartData',
  default: [{ time: '2022-10-25T12:44:36.732Z', temperature: 36 }],
});
export { chartTypeState, tempDataState };
