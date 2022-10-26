import { TabList, Tab, Card, AreaChart, LineChart } from '@tremor/react';

import { useState } from 'react';

const chartdata = [
  {
    date: 'Jan 22',
    SemiAnalysis: 2890,
    'The Pragmatic Engineer': 2338,
  },
  {
    date: 'Feb 22',
    SemiAnalysis: 2756,
    'The Pragmatic Engineer': 2103,
  },
  {
    date: 'Mar 22',
    SemiAnalysis: 3322,
    'The Pragmatic Engineer': 2194,
  },
  {
    date: 'Apr 22',
    SemiAnalysis: 3470,
    'The Pragmatic Engineer': 2108,
  },
  {
    date: 'May 22',
    SemiAnalysis: 3475,
    'The Pragmatic Engineer': 1812,
  },
  {
    date: 'Jun 22',
    SemiAnalysis: 3129,
    'The Pragmatic Engineer': 1726,
  },
];
const lchartdata = [
  {
    year: 1951,
    'Population growth rate': 1.74,
  },
  {
    year: 1952,
    'Population growth rate': 0.5,
  },
  {
    year: 1953,
    'Population growth rate': 1.5,
  },
  {
    year: 1954,
    'Population growth rate': 0.1,
  },
  {
    year: 1955,
    'Population growth rate': 2,
  },
];

export default () => {
  const [showCard, setShowCard] = useState(true);

  const dataFormatter = (number: number) => {
    return '$ ' + Intl.NumberFormat('us').format(number).toString();
  };
  const ldataFormatter = (number: number) =>
    `${Intl.NumberFormat('us').format(number).toString()}%`;

  return (
    <Card>
      <>
        <TabList
          defaultValue={0}
          handleSelect={(value) => setShowCard(value === 0)}
          marginTop="mt-6"
        >
          <Tab value={0} text="AreaChart" />
          <Tab value={1} text="LineChart" />
        </TabList>
      </>

      {showCard === true ? (
        <div className="mt-6">
          <AreaChart
            data={chartdata}
            categories={['SemiAnalysis', 'The Pragmatic Engineer']}
            dataKey="date"
            height="h-72"
            colors={['indigo', 'cyan']}
            valueFormatter={dataFormatter}
            marginTop="mt-4"
          />
        </div>
      ) : (
        <div className="mt-6">
          <LineChart
            data={lchartdata}
            dataKey="data"
            categories={['Population growth rate']}
            colors={['blue']}
            valueFormatter={ldataFormatter}
            marginTop="mt-6"
            yAxisWidth="w-10"
          />
        </div>
      )}
    </Card>
  );
};
