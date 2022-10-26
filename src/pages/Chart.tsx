import { Toggle, Card, AreaChart, LineChart, ToggleItem } from '@tremor/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../constants/constants';

const sensorchart = [
  {
    date: 'Jan 22',
    Temperature: 2890,
    Humidity: 2338,
    Illuminance: 2000,
    SoilHumidity: 2222,
  },
  {
    date: 'Feb 22',
    Temperature: 2290,
    Humidity: 2638,
    Illuminance: 2400,
    SoilHumidity: 2822,
  },
  {
    date: 'Mar 22',
    Temperature: 2820,
    Humidity: 2378,
    Illuminance: 2050,
    SoilHumidity: 2442,
  },
  {
    date: 'Apr 22',
    Temperature: 2890,
    Humidity: 2338,
    Illuminance: 2000,
    SoilHumidity: 2222,
  },
  {
    date: 'May 22',
    Temperature: 2800,
    Humidity: 2308,
    Illuminance: 2560,
    SoilHumidity: 2222,
  },
  {
    date: 'Jun 22',
    Temperature: 2620,
    Humidity: 2738,
    Illuminance: 2220,
    SoilHumidity: 2492,
  },
];

export default () => {
  const [showCard, setShowCard] = useState(true);
  const [chart, setChart] = useState('Temperature');

  const dollarFormatter = (value: number) =>
    `$ ${Intl.NumberFormat('us').format(value).toString()}`;

  const formatters: { [key: string]: any } = {
    All: dollarFormatter,
    Temperature: dollarFormatter,
    Humidity: dollarFormatter,
    Illuminance: dollarFormatter,
    SoilHumidity: dollarFormatter,
  };
  // const [chartdata, setChartdata] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchChartdata = async () => {
  //     try {
  //       setError(null);
  //       setChartdata(null);
  //       setLoading(true);

  //       const res = await axios
  //         .get(API_URL + '/sensor')
  //         .then((res) => setChartdata(res.data));
  //     } catch (e) {}
  //     setLoading(false);
  //   };
  //   fetchChartdata();
  // }, []);
  // if (loading) return <div>로딩중..</div>;
  // if (error) return <div>에러가 발생했습니다</div>;
  // if (!chartdata) return null;

  return (
    <Card>
      <>
        <Toggle
          defaultValue={0}
          handleSelect={(value) => setShowCard(value === 0)}
          marginTop="mt-2"
        >
          <ToggleItem value={0} text="AreaChart" />
          <ToggleItem value={1} text="LineChart" />
        </Toggle>
      </>

      {showCard === true ? (
        <div className="mt-6">
          <AreaChart
            data={sensorchart}
            categories={[chart]}
            dataKey="date"
            height="h-96"
            yAxisWidth="w-14"
            colors={['blue']}
            valueFormatter={formatters[chart]}
            marginTop="mt-4"
          />
        </div>
      ) : (
        <div className="mt-6">
          <LineChart
            data={sensorchart}
            dataKey="data"
            categories={[chart]}
            colors={['blue']}
            valueFormatter={formatters[chart]}
            marginTop="mt-6"
            yAxisWidth="w-10"
          />
        </div>
      )}
      <Toggle
        color="zinc"
        defaultValue={chart}
        handleSelect={(value) => setChart(value)}
        marginTop="mt-3"
      >
        <ToggleItem value="All" text="All Chart" />
        <ToggleItem value="Temperature" text="Temperature Chart" />
        <ToggleItem value="Humidity" text="Humidity Chart" />
        <ToggleItem value="Illuminance" text="Illuminance Chart" />
        <ToggleItem value="SoilHumidity" text="Soil Humidity Chart" />
      </Toggle>
    </Card>
  );
};
