import { AreaChart } from '@tremor/react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { getLocalsensorAPI, sensorAPI } from '../api/sensor';
import { useLanguage } from '../hooks';
import { tempDataState } from '../state/atoms';

export default () => {
  const [tempData, setTempData] = useRecoilState(tempDataState);
  const [lang, setLang] = useLanguage();

  useEffect(() => {
    // sensorAPI(1, 10, 'temperature', setTempData, lang);
    getLocalsensorAPI(setTempData, lang);
  }, [lang]);

  return (
    <AreaChart
      data={tempData}
      categories={['temperature']}
      dataKey="time"
      height="h-96"
      yAxisWidth="w-14"
      colors={['blue']}
      marginTop="mt-4"
    />
  );
};
