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
import Weather from '../Weather';

const Main = () => {
  const [lang, setLang] = useLanguage();
  const onRefresh = () => {
    setLang();
  };

  return (
    <>
      <h1>{`${languages.logo[lang]}`}</h1>
      <h2>{`${languages.header[lang]}`}</h2>
      <div
        style={{
          justifyContent: 'space-between',
          width: '100%',
          display: 'flex',
          marginBottom: '10px',
        }}
      >
        <Toggle color="zinc" defaultValue={lang} handleSelect={setLang}>
          <ToggleItem value="en" text="🇬🇧 English" />
          <ToggleItem value="ko" text="🇰🇷 한국어" />
        </Toggle>
      </div>
      <ColGrid
        numCols={1}
        numColsSm={2}
        numColsLg={4}
        gapX="gap-x-2"
        gapY="gap-y-2"
      >
        <Col numColSpan={1} numColSpanLg={4}>
          <Card hFull>
            <APIChart />
          </Card>
        </Col>
        <SensorCard />
        <Control />
        <Weather />
      </ColGrid>
    </>
  );
};
export default Main;
