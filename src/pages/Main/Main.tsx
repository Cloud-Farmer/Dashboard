import React from 'react';
import {
  ColGrid,
  Col,
  Card,
  Text,
  Metric,
  Toggle,
  ToggleItem,
} from '@tremor/react';
//import TestChart1 from '../Example/TestChart1';
//import TextChart2 from '../Example/TextChart2';
//import TestTable from '../Example/TestTable';
//import { useLanguage } from '../../hooks';
import SensorCard from '../SensorCard';
import Control from '../Control';
import Chart from '../Chart';
import { useLanguage } from '../../hooks';
import { languages } from '../../util';
import APIChart from '../APIChart';

const Main = () => {
  const [lang, setLang] = useLanguage();

  return (
    <>
      <Toggle color="zinc" defaultValue={lang} handleSelect={setLang}>
        <ToggleItem value="en" text="ENGLISH" />
        <ToggleItem value="ko" text="KOREAN" />
      </Toggle>
      <h1>{`${languages.header[lang]}`}</h1>
      <ColGrid
        numCols={1}
        numColsSm={2}
        numColsLg={4}
        gapX="gap-x-2"
        gapY="gap-y-2"
      >
        <Col numColSpan={1} numColSpanLg={4}>
          <APIChart />
        </Col>
        <SensorCard />
        <Control />
      </ColGrid>
    </>
  );
};
export default Main;
