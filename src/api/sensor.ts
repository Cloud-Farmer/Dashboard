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
  data[0].series[0].values.map((value: any) => {
    formattedData.push({
      time: new Date(value[0]).toLocaleString(
        lang === 'ko' ? 'ko-KR' : 'en-US',
      ),
      [sensor]: Number(value[2]),
    });
  });
  return formattedData;
};

const getSensorAPI = (
  kit_id: number,
  limit: number,
  sensor: SensorType,
  setChartData: SetterOrUpdater<Array<any>>,
  lang?: LanguageType,
) => {
  axios
    .get(API_URL + sensorurl, {
      params: { kit_id, limit, sensor },
      headers: headerConfig,
    })
    .then((response: AxiosResponse) => {
      setChartData(formatData(response.data, sensor, lang));
    })
    .catch((error) => {
      handleError(error);
    });
};

const controlSensorAPI = (
  availiable: boolean,
  kitid: number,
  sensor: ControlSensorType,
  lang: LanguageType,
) => {
  axios
    .post(API_URL + controlurl, null, {
      params: { availiable: availiable ? 1 : 0, kitid, sensor },
      headers: headerConfig,
    })
    .then((response: AxiosResponse) => {
      toast.info(languages.result_send[lang] + '\n' + response.data);
    })
    .catch((error) => {
      handleError(error);
    });
};

const controlSensorStatusAPI = (setStatus: Dispatch<any>) => {
  axios
    .get(API_URL + 'dd', {
      headers: headerConfig,
    })
    .then((response: AxiosResponse) => {
      // setStatus(Boolean(response.data));
      console.log(response.data);
    })
    .catch((error) => {
      handleError(error);
    });
};

export { getSensorAPI, controlSensorAPI, controlSensorStatusAPI };
