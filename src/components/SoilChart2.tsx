import { useEffect, useState } from 'react';
import {
  AreaChart,
  LineChart,
  Toggle,
  ToggleItem,
  Dropdown,
  DropdownItem,
  Card,
  Metric,
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
  const [soilData, setSoilData] = useRecoilState(soilDataState);

  const [chart, setChart] = useState('temperature');
  const [showCard, setShowCard] = useState(true);
  const [lang, setLang] = useLanguage();
  const [kit2, setKit2] = useState(2);
  const [kitCookie, setKitCookie] = useKitId();
  const [day, setDay] = useState(['1m', '1h', '1d', '1w']);
  const [num, setNum] = useState(0);

  useEffect(() => {
    getSensorAPI(kit2, 'soilHumidity', day[num], setSoilData, lang);
  }, [lang, kit2, num]);
  const soilFormatter = (value: number) => value + '%';

  const formatters: { [key: string]: any } = {
    soilhumidity: soilFormatter,
  };

  const chartData: { [key: string]: any } = {
    soilhumidity: soilData,
  };
  return (
    <>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Metric>Soil Humidity</Metric>
          <Dropdown
            placeholder="Select..."
            defaultValue={1}
            handleSelect={(value) => setNum(value)}
            maxWidth="max-w-xs"
            marginTop="mt-0"
          >
            <DropdownItem value={0} text="minute" />
            <DropdownItem value={1} text="hour" />
            <DropdownItem value={2} text="day" />
            <DropdownItem value={3} text="week" />
          </Dropdown>
        </div>
        {showCard ? (
          <AreaChart
            data={chartData[chart]}
            categories={[chart]}
            dataKey="time"
            height="h-60"
            valueFormatter={formatters[chart]}
            yAxisWidth="w-10"
            colors={['blue']}
            marginTop="mt-4"
          />
        ) : (
          <LineChart
            data={chartData[chart]}
            categories={[chart]}
            dataKey="time"
            height="h-60"
            yAxisWidth="w-10"
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
        </div>
      </Card>
    </>
  );
};
