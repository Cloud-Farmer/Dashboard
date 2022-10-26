import { atom } from 'recoil';

const chartTypeState = atom({
  key: 'charType',
  default: 'area',
});

const tempDataState = atom({
  key: 'tempData',
  default: [
    {
      time: new Date('2022-10-25T12:44:36.732Z').toLocaleString('en-US'),
      temperature: 36,
    },
  ],
});

const humDataState = atom({
  key: 'humData',
  default: [
    {
      time: new Date('2022-10-25T12:44:36.732Z').toLocaleString('en-US'),
      humidity: 36,
    },
  ],
});

const illDataState = atom({
  key: 'illData',
  default: [
    {
      time: new Date('2022-10-25T12:44:36.732Z').toLocaleString('en-US'),
      illuminance: 36,
    },
  ],
});

const soilDataState = atom({
  key: 'soilData',
  default: [
    {
      time: new Date('2022-10-25T12:44:36.732Z').toLocaleString('en-US'),
      soilhumidity: 36,
    },
  ],
});

export {
  chartTypeState,
  tempDataState,
  humDataState,
  illDataState,
  soilDataState,
};
