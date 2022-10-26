import { useEffect, useState } from 'react';
import { AreaChart, LineChart, Toggle, ToggleItem } from '@tremor/react';
import { useRecoilState } from 'recoil';
import { getSensorAPI } from '../api/sensor';
import { useLanguage } from '../hooks';
import {
  humDataState,
  illDataState,
  soilDataState,
  tempDataState,
} from '../state/atoms';
import { SensorType } from '../type';
import { languages } from '../util';

export default () => {
  const [tempData, setTempData] = useRecoilState(tempDataState);
  const [humData, setHumData] = useRecoilState(humDataState);
  const [illData, setIllData] = useRecoilState(illDataState);
  const [soilData, setSoilData] = useRecoilState(soilDataState);

  const [chart, setChart] = useState('temperature');
  const [showCard, setShowCard] = useState(true);
  const [lang, setLang] = useLanguage();

  useEffect(() => {
    getSensorAPI(1, 10, 'temperature', setTempData, lang);
    getSensorAPI(1, 10, 'humidity', setHumData, lang);
    getSensorAPI(1, 10, 'illuminance', setIllData, lang);
    getSensorAPI(1, 10, 'soilhumidity', setSoilData, lang);
  }, [lang]);

  const tempFormatter = (value: number) => value; //+ 'C';

  const formatters: { [key: string]: any } = {
    temperature: tempFormatter,
    humidity: tempFormatter,
    illuminance: tempFormatter,
    soilhumidity: tempFormatter,
  };

  const chartData: { [key: string]: any } = {
    temperature: tempData,
    humidity: humData,
    illuminance: illData,
    soilhumidity: soilData,
  };

  return (
    <>
      {showCard ? (
        <AreaChart
          data={chartData[chart]}
          categories={[chart]}
          dataKey="time"
          height="h-96"
          valueFormatter={formatters[chart]}
          yAxisWidth="w-14"
          colors={['blue']}
          marginTop="mt-4"
        />
      ) : (
        <LineChart
          data={chartData[chart]}
          categories={[chart]}
          dataKey="time"
          height="h-96"
          yAxisWidth="w-14"
          colors={['blue']}
          marginTop="mt-4"
        />
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Toggle
          defaultValue={0}
          handleSelect={(value) => setShowCard(value === 0)}
          marginTop="mt-2"
        >
          <ToggleItem value={0} text={languages.areatoggle[lang]} />
          <ToggleItem value={1} text={languages.linetoggle[lang]} />
        </Toggle>
        <Toggle
          color="zinc"
          defaultValue={chart}
          handleSelect={(value) => setChart(value)}
          marginTop="mt-3"
        >
          <ToggleItem value="temperature" text={languages.temptoggle[lang]} />
          <ToggleItem value="humidity" text={languages.humtoggle[lang]} />
          <ToggleItem value="illuminance" text={languages.illtoggle[lang]} />
          <ToggleItem value="soilhumidity" text={languages.soiltoggle[lang]} />
        </Toggle>
      </div>
    </>
  );
};
