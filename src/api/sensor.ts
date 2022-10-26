import { array } from './../../node_modules/@types/prop-types/index.d';
import { toast } from 'react-toastify';
import { AxiosResponse } from './../../node_modules/axios/index.d';
import axios from 'axios';
import { API_URL } from '../constants/constants';
import { SetterOrUpdater } from 'recoil';

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

const formatDataToChart = (response: AxiosResponse) => {
  const formattedData = new Array<ChartDataType>();
  response.data.map((data: any) => {
    data.series.map((serie: any) => {
      serie.values.map((value: any) => {
        formattedData.push({ time: value[0], temperature: Number(value[2]) });
      });
    });
  });
  return formattedData;
};

const sensorAPI = (
  kit_id: number,
  limit: number,
  sensor: 'temperature' | '',
  setChartData: SetterOrUpdater<Array<ChartDataType>>,
) => {
  axios
    .get(API_URL + sensorurl, {
      params: { kit_id, limit, sensor },
      headers: headerConfig,
    })
    .then((response: AxiosResponse) => {
      setChartData(formatDataToChart(response));
    })
    .catch((error) => {
      handleError(error);
    });
};

export { sensorAPI };
