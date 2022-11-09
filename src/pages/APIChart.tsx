import { useEffect, useState } from 'react';
import {
  AreaChart,
  LineChart,
  Toggle,
  ToggleItem,
  Dropdown,
  DropdownItem,
  ColGrid,
  Col,
  Card,
  Flex,
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

  const dataTypes = ['temperature', 'humidity', 'illuminance', 'soilHumidity'];
  const titleTypes = [
    'temperaturecard',
    'humiditycard',
    'illuminancecard',
    'soilhumiditycard',
  ];

  const [showCard, setShowCard] = useState(true);
  const [lang, setLang] = useLanguage();

  const [day, setDay] = useState('1d');

  useEffect(() => {
    getSensorAPI(kit, 'temperature', day, setTempData, lang);
    getSensorAPI(kit, 'humidity', day, setHumData, lang);
    getSensorAPI(kit, 'illuminance', day, setIllData, lang);
    getSensorAPI(kit, 'soilHumidity', day, setSoilData, lang);
  }, [lang, kit, day]);

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
      <div className="flex justify-between place-items-center mb-1">
        <Toggle
          color="zinc"
          defaultValue={'1d'}
          handleSelect={(value) => setDay(value)}
        >
          <ToggleItem value={'1d'} text={languages.frequency_1d[lang]} />
          <ToggleItem value={'1w'} text={languages.frequency_1w[lang]} />
          <ToggleItem value={'3mo'} text={languages.frequency_3mo[lang]} />
          <ToggleItem value={'1y'} text={languages.frequency_1y[lang]} />
        </Toggle>

        <Toggle
          defaultValue={0}
          handleSelect={(value) => setShowCard(value === 0)}
        >
          <ToggleItem value={0} text={languages.areatoggle[lang]} />
          <ToggleItem value={1} text={languages.linetoggle[lang]} />
        </Toggle>
      </div>
      <ColGrid numCols={2} gapX="gap-x-2" gapY="gap-y-2">
        {dataTypes.map((data, index) => (
          <Col>
            {' '}
            <Card>
              <div className="flex justify-between">
                <Metric>{languages[titleTypes[index]][lang]}</Metric>
                <Metric>
                  {(data === 'temperature' &&
                    tempData[tempData.length - 1].temperature + 'C°') ||
                    (data === 'humidity' &&
                      humData[humData.length - 1].humidity + '%') ||
                    (data === 'illuminance' &&
                      illData[illData.length - 1].illuminance + 'lx') ||
                    (data === 'soilHumidity' &&
                      soilData[soilData.length - 1].soilHumidity + '%')}
                </Metric>
              </div>
              {showCard ? (
                <AreaChart
                  data={chartData[data]}
                  categories={[data]}
                  dataKey="time"
                  height="h-60"
                  valueFormatter={formatters[data]}
                  yAxisWidth="w-14"
                  colors={['blue']}
                  marginTop="mt-4"
                />
              ) : (
                <LineChart
                  data={chartData[data]}
                  categories={[data]}
                  dataKey="time"
                  height="h-60"
                  yAxisWidth="w-14"
                  colors={['blue']}
                  marginTop="mt-4"
                />
              )}
            </Card>
          </Col>
        ))}
      </ColGrid>
    </>
  );
};

export default APIChart;
