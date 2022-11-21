import { array } from './../../node_modules/@types/prop-types/index.d';
import { toast } from 'react-toastify';
import { AxiosResponse } from './../../node_modules/axios/index.d';
import axios from 'axios';
import { API_URL } from '../constants/constants';
import { SetterOrUpdater } from 'recoil';
import { ControlSensorType, LanguageType, SensorType } from '../type';
import { languages } from '../util';
import { Dispatch, SetStateAction } from 'react';

const sensorurl = '/sensor';
const controlurl = '/actuator';
const alerturl = '/kit/alert/';
const alertsettingurl = '/kit/alert/';
const autocontrolurl = '/kit/';

const headerConfig = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

const handleError = (error: any) => {
  if (error.response) {
    toast.error(error.response.data);
  } else if (error.request) {
    toast.error(error.request);
  } else {
    toast.error(error.message);
  }
};

const formatData = (data: any, sensor: SensorType, lang?: LanguageType) => {
  const formattedData = new Array<any>();
  data.map((item: any) => {
    const value = Number(item.values._value);
    formattedData.push({
      time: new Date(item.values._time).toLocaleString(
        lang === 'ko' ? 'ko-KR' : 'en-US',
      ),
      [sensor]: value % 1 === 0 ? value : value.toFixed(2),
    });
  });
  return formattedData;
};

const getSensorAPI = (
  kit_id: number,
  sensor: SensorType,
  date: string,
  setChartData: SetterOrUpdater<Array<any>>,
  lang?: LanguageType,
) => {
  axios
    .get(API_URL + sensorurl, {
      params: { date, kit_id, sensor },
      headers: headerConfig,
    })
    .then((response: AxiosResponse) => {
      setChartData(formatData(response.data, sensor, lang));
    })
    .catch((error) => {
      handleError(error);
      //console.log(error.response.data);
    });
};

const controlSensorAPI = (
  available: boolean,
  kitid: number,
  sensor: ControlSensorType,
  lang: LanguageType,
) => {
  console.log(available + ' ' + kitid + ' ' + sensor);
  axios
    .post(API_URL + controlurl, null, {
      params: { available: available ? 1 : 0, kitid, sensor },
      headers: headerConfig,
    })
    .then((response: AxiosResponse) => {
      toast.info(languages.result_send[lang] + '\n' + response.data);
    })
    .catch((error) => {
      handleError(error);
    });
};

const controlSensorStatusAPI = async (
  kit_id: number,
  sensor: ControlSensorType,
  setDataFunc: Dispatch<SetStateAction<any>>,
) => {
  await axios
    .get(API_URL + controlurl, {
      params: { kit_id, sensor },
      headers: headerConfig,
    })
    .then(async (response: AxiosResponse) => {
      if (response.status === 200)
        await setDataFunc((prev: any) => {
          console.log(response.data[0].value);
          return { ...prev, [sensor]: Boolean(response.data[0].value) };
        });
    })
    .catch((error) => {
      handleError(error);
    });
};
const alertAPI = async (
  kit_id: number,
  page: number,
  size: number,
  setAlertData: any,
) => {
  await axios
    .get(API_URL + alerturl + kit_id, {
      params: { kit_id, page, size },
      headers: headerConfig,
    })
    .then((response: AxiosResponse) => {
      setAlertData(response.data);
    });
};
const alertsettingAPI = async (
  kitid: number,
  sensor: SensorType,
  value: number,
) => {
  axios
    .post(API_URL + alertsettingurl + kitid, null, {
      params: { kitid, sensor, value },
      headers: headerConfig,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      handleError(error);
    });
};
// 자동제어
const AutocontrolAPI = (kitid: number, value: number) => {
  console.log(kitid + ' ' + value);
  axios
    .post(API_URL + autocontrolurl + kitid + '/auto', null, {
      params: { kitid, value },
      headers: headerConfig,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      handleError(error);
    });
};
const AutocontrolStatusAPI = async (kit_id: number) => {
  await axios
    .get(API_URL + autocontrolurl + kit_id + '/auto', {
      params: {},
      headers: headerConfig,
    })
    .then(async (response: AxiosResponse) => {
      if (response.status === 200) console.log(response);
    })
    .catch((error) => {
      handleError(error);
    });
};

export {
  getSensorAPI,
  controlSensorAPI,
  controlSensorStatusAPI,
  alertAPI,
  alertsettingAPI,
  AutocontrolAPI,
  AutocontrolStatusAPI,
};
