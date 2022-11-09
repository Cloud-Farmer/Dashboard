import React, { useState } from 'react';
import {
  ColGrid,
  Col,
  Card,
  Text,
  Metric,
  Toggle,
  ToggleItem,
  Button,
} from '@tremor/react';
import SensorCard from './SensorCard';
import Control from './Control';
import { useLanguage } from '../hooks';
import { languages } from '../util';
import APIChart from './APIChart';
import Weather from './SideBar';
import {
  humDataState,
  illDataState,
  soilDataState,
  tempDataState,
  dateDataState,
} from '../state/atoms';

const Main = () => {
  const [lang, setLang] = useLanguage();
  const [kit, setKit] = useState(1);

  return (
    <div className="px-7 py-10">
      <div className="flex flex-row justify-between pb-5 items-center">
        <div>
          <h1 className="text-4xl m-0">{`${languages.logo[lang]}`}</h1>
          <h2 className="text-xl m-0">{`${languages.header[lang]}`}</h2>
        </div>
      </div>
      <div className="flex flex-row space-x-3 items-stretch">
        <Weather lang={lang} setLang={setLang} kit={kit} setKit={setKit} />
        <div className="h-full w-3/4">
          <ColGrid
            numCols={1}
            numColsSm={2}
            numColsLg={4}
            gapX="gap-x-2"
            gapY="gap-y-2"
          >
            <Col numColSpan={1} numColSpanLg={4}>
              <Card hFull>
                <APIChart kit={kit} setKit={setKit} />
              </Card>
            </Col>
            <SensorCard />
            <Control />
          </ColGrid>
        </div>
      </div>
    </div>
  );
};
export default Main;
