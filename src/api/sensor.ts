import { array } from './../../node_modules/@types/prop-types/index.d';
import { toast } from 'react-toastify';
import { AxiosResponse } from './../../node_modules/axios/index.d';
import axios from 'axios';
import { API_URL } from '../constants/constants';
import { SetterOrUpdater } from 'recoil';
import sensorDataList from './sensorDataList.json';

const sensorurl = '/sensor';

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

interface ChartDataType {
  time: string;
  temperature: number;
}

const formatDataToChart = (data: any, lang?: 'ko' | 'en') => {
  const formattedData = new Array<ChartDataType>();
  data[0].series[0].values.map((value: any) => {
    formattedData.push({
      time: new Date(value[0]).toLocaleString(
        lang === 'ko' ? 'ko-KR' : 'en-US',
      ),
      temperature: Number(value[2]),
    });
  });
  return formattedData;
};

const sensorAPI = (
  kit_id: number,
  limit: number,
  sensor: 'temperature' | '',
  setChartData: SetterOrUpdater<Array<ChartDataType>>,
  lang?: 'ko' | 'en',
) => {
  axios
    .get(API_URL + sensorurl, {
      params: { kit_id, limit, sensor },
      headers: headerConfig,
    })
    .then((response: AxiosResponse) => {
      setChartData(formatDataToChart(response.data, lang));
    })
    .catch((error) => {
      handleError(error);
    });
};

const getLocalsensorAPI = (
  setChartData: SetterOrUpdater<Array<ChartDataType>>,
  lang?: 'ko' | 'en',
) => setChartData(formatDataToChart(sensorDataList, lang));

export { sensorAPI, getLocalsensorAPI };
