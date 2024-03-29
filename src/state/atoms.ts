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
      soilHumidity: 36,
    },
  ],
});
const dateDataState = atom({
  key: 'dateData',
  default: [
    {
      m: '1h',
    },
  ],
});
const alertDataState = atom({
  key: 'alert',
  default: {
    alertResponseDtoList: [
      {
        subject: '',
        messageKR: '',
        messageEng: '',
        status: '',
        language: '',
        alertedTime: new Date('2022-11-16T12:44:36.742z').toLocaleString(
          'ko-KO',
        ),
      },
    ],
    totalElements: 1,
    totalPages: 1,
  },
});
const newkitState = atom({
  key: 'newkit',
  default: [
    {
      id: 1,
      alias: 'KIT 1',
    },
    {
      id: 2,
      alias: 'KIT 2',
    },
  ],
});

const controlState = atom({
  key: 'controlState',
  default: {
    window: { data: undefined, time: '' },
    pump: { data: undefined, time: '' },
    fan: { data: undefined, time: '' },
    led: { data: undefined, time: '' },
  },
});

const dateFrequencyState = atom({
  key: 'frequencyState',
  default: '1d',
});

const allkitsState = atom({
  key: 'allkitsState',
  default: [{ id: 1 }, { id: 2 }],
});

export {
  chartTypeState,
  tempDataState,
  humDataState,
  illDataState,
  soilDataState,
  dateDataState,
  alertDataState,
  newkitState,
  controlState,
  dateFrequencyState,
  allkitsState,
};
