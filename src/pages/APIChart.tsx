import {
  AreaChart,
  Card,
  Col,
  ColGrid,
  LineChart,
  Metric,
  Toggle,
  ToggleItem,
} from '@tremor/react';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useLanguage } from '../hooks';
import {
  dateFrequencyState,
  humDataState,
  illDataState,
  soilDataState,
  tempDataState,
} from '../state/atoms';
import { languages } from '../util';

const APIChart = () => {
  const tempData = useRecoilValue(tempDataState);
  const humData = useRecoilValue(humDataState);
  const illData = useRecoilValue(illDataState);
  const soilData = useRecoilValue(soilDataState);
  const setDay = useSetRecoilState(dateFrequencyState);

  const dataTypes = ['temperature', 'humidity', 'illuminance', 'soilHumidity'];
  const titleTypes = [
    'temperaturecard',
    'humiditycard',
    'illuminancecard',
    'soilhumiditycard',
  ];

  const colors: any = ['red', 'blue', 'orange', 'green'];

  const [showCard, setShowCard] = useState(true);
  const [lang, setLang] = useLanguage();

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
    <div className="mx-5 mt-8">
      <div className="flex justify-between place-items-center mb-4">
        <Toggle
          color="fuchsia"
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
          <Col key={data}>
            {' '}
            <Card>
              <div className="flex justify-between items-center">
                <p className="text-3xl font-extrabold my-0">
                  {languages[titleTypes[index]][lang]}
                </p>
                <p className="text-5xl font-light my-0">
                  {(data === 'temperature' &&
                    tempData[tempData.length - 1].temperature + 'C°') ||
                    (data === 'humidity' &&
                      humData[humData.length - 1].humidity + '%') ||
                    (data === 'illuminance' &&
                      illData[illData.length - 1].illuminance + 'lx') ||
                    (data === 'soilHumidity' &&
                      soilData[soilData.length - 1].soilHumidity + '%')}
                </p>
              </div>
              {showCard ? (
                <AreaChart
                  data={chartData[data]}
                  categories={[data]}
                  dataKey="time"
                  height="h-60"
                  valueFormatter={formatters[data]}
                  yAxisWidth="w-14"
                  colors={[colors[index]]}
                  marginTop="mt-4"
                />
              ) : (
                <LineChart
                  data={chartData[data]}
                  categories={[data]}
                  dataKey="time"
                  height="h-60"
                  yAxisWidth="w-14"
                  colors={[colors[index]]}
                  marginTop="mt-4"
                />
              )}
            </Card>
          </Col>
        ))}
      </ColGrid>
    </div>
  );
};

export default APIChart;
