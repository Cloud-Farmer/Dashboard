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

export default () => {
  const [tempData, setTempData] = useRecoilState(tempDataState);
  const [humData, setHumData] = useRecoilState(humDataState);
  const [illData, setIllData] = useRecoilState(illDataState);
  const [soilData, setSoilData] = useRecoilState(soilDataState);
  const [dateData, setDate] = useRecoilState(dateDataState);

  const [chart, setChart] = useState('temperature');
  const [showCard, setShowCard] = useState(true);
  const [lang, setLang] = useLanguage();
  const [kit, setKit] = useState(1);
  const [kitCookie, setKitCookie] = useKitId();
  const [day, setDay] = useState('m');

  useEffect(() => {
    getSensorAPI(kit, 'temperature', dateData[0].m, setTempData, lang);
    getSensorAPI(kit, 'humidity', dateData[0].m, setHumData, lang);
    getSensorAPI(kit, 'illuminance', dateData[0].m, setIllData, lang);
    getSensorAPI(kit, 'soilhumidity', dateData[0].m, setSoilData, lang);
  }, [lang, kit]);

  const tempFormatter = (value: number) => value + 'C';
  const humFormatter = (value: number) => value + '%';
  const illFormatter = (value: number) => value + 'lx';
  const soilFormatter = (value: number) => value + '%';

  const formatters: { [key: string]: any } = {
    temperature: tempFormatter,
    humidity: humFormatter,
    illuminance: illFormatter,
    soilhumidity: soilFormatter,
  };

  const chartData: { [key: string]: any } = {
    temperature: tempData,
    humidity: humData,
    illuminance: illData,
    soilhumidity: soilData,
  };
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* <Dropdown
          placeholder="Select..."
          defaultValue={dateData}
          handleSelect={(value) => setDate(value)}
          maxWidth="max-w-xs"
          marginTop="mt-0"
        >
          <DropdownItem value="1m" text="minute" />
          <DropdownItem value="1h" text="hour" />
          <DropdownItem value="1d" text="day" />
          <DropdownItem value="1w" text="week" />
        </Dropdown> */}
        <Toggle
          color="zinc"
          defaultValue={kit}
          handleSelect={(value) => {
            setKit(value);
            setKitCookie(value);
            getSensorAPI(
              value,
              'temperature',
              dateData[0].m,
              setTempData,
              lang,
            );
            getSensorAPI(value, 'humidity', dateData[0].m, setHumData, lang);
            getSensorAPI(value, 'illuminance', dateData[0].m, setIllData, lang);
            getSensorAPI(
              value,
              'soilhumidity',
              dateData[0].m,
              setSoilData,
              lang,
            );
          }}
        >
          <ToggleItem value={1} text="KIT1" />
          <ToggleItem value={2} text="KIT2" />
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
