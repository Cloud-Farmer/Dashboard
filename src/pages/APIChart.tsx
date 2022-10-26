import { AreaChart } from '@tremor/react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { sensorAPI } from '../api/sensor';
import { tempDataState } from '../state/atoms';

export default () => {
  const [tempData, setTempData] = useRecoilState(tempDataState);

  type dataType = 'temperature' | '';

  useEffect(() => {
    sensorAPI(1, 10, 'temperature', setTempData);
  }, []);

  return (
    <AreaChart
      data={tempData}
      categories={['temperature']}
      dataKey="time"
      height="h-96"
      yAxisWidth="w-14"
      colors={['blue']}
      // valueFormatter={formatters[chart]}
      marginTop="mt-4"
    />
  );
};
