import { useEffect, useState } from 'react';
import {
  AreaChart,
  LineChart,
  Toggle,
  ToggleItem,
  Dropdown,
  DropdownItem,
} from '@tremor/react';
import { useRecoilState } from 'recoil';
import { getSensorAPI } from '../api/sensor';
import { useLanguage } from '../hooks';
import {
  humDataState,
  illDataState,
  soilDataState,
  tempDataState,
  dateDataState,
} from '../state/atoms';
import { SensorType } from '../type';
import { languages } from '../util';
import useKitId from '../hooks/useKitId';
import Main from './Main';

interface Props {
  kit: number;
  setKit: React.Dispatch<React.SetStateAction<number>>;
}

const APIChart: React.FC<Props> = ({ kit, setKit }) => {
  const [tempData, setTempData] = useRecoilState(tempDataState);
  const [humData, setHumData] = useRecoilState(humDataState);
  const [illData, setIllData] = useRecoilState(illDataState);
  const [soilData, setSoilData] = useRecoilState(soilDataState);
  const [dateData, setDate] = useRecoilState(dateDataState);

  const [chart, setChart] = useState('temperature');
  const [chart1, setChart1] = useState('temperature');
  const [showCard, setShowCard] = useState(true);
  const [lang, setLang] = useLanguage();

  const [day, setDay] = useState('1d');

  useEffect(() => {
    getSensorAPI(kit, 'temperature', day, setTempData, lang);
    getSensorAPI(kit, 'humidity', day, setHumData, lang);
    getSensorAPI(kit, 'illuminance', day, setIllData, lang);
    getSensorAPI(kit, 'soilHumidity', day, setSoilData, lang);
  }, [lang, kit, day]);
  //console.log(props.name); // 키트 넘버

  const tempFormatter = (value: number) => value + 'C';
  const humFormatter = (value: number) => value + '%';
  const illFormatter = (value: number) => value + 'lx';
  const soilFormatter = (value: number) => value + '%';

  const formatters: { [key: string]: any } = {
    temperature: tempFormatter,
    humidity: humFormatter,
    illuminance: illFormatter,
    soilHumidity: soilFormatter,
  };

  const chartData: { [key: string]: any } = {
    temperature: tempData,
    humidity: humData,
    illuminance: illData,
    soilHumidity: soilData,
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Toggle
          color="zinc"
          defaultValue={'1d'}
          handleSelect={(value) => setDay(value)}
          marginTop="mt-0"
        >
          <ToggleItem value={'1d'} text={languages.frequency_1d[lang]} />
          <ToggleItem value={'1w'} text={languages.frequency_1w[lang]} />
          <ToggleItem value={'3mo'} text={languages.frequency_3mo[lang]} />
          <ToggleItem value={'1y'} text={languages.frequency_1y[lang]} />
        </Toggle>
      </div>
      {showCard ? (
        <AreaChart
          data={chartData[chart]}
          categories={[chart]}
          dataKey="time"
          height="h-96"
          valueFormatter={formatters[chart]}
          yAxisWidth="w-14"
          colors={['green', 'blue']}
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
          <ToggleItem value="soilHumidity" text={languages.soiltoggle[lang]} />
        </Toggle>
      </div>
    </>
  );
};

export default APIChart;
