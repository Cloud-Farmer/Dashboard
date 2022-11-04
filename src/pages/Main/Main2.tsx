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
  TabList,
  Tab,
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
import TempChart from '../../components/TempChart';
import HumChart from '../../components/HumChart';
import SoilChart from '../../components/SoilChart';
import IllChart from '../../components/IllChart';
import Main from './Main';

const Main2 = () => {
  const [lang, setLang] = useLanguage();
  const onRefresh = () => {
    setLang();
  };
  const [selectedView, setSelectedView] = useState(1);
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
        <TabList
          defaultValue={1}
          handleSelect={(value) => setSelectedView(value)}
        >
          <Tab value={1} text="Over View" />
          <Tab value={2} text="Detail View" />
        </TabList>
        <Toggle color="zinc" defaultValue={lang} handleSelect={setLang}>
          <ToggleItem value="en" text="🇬🇧 English" />
          <ToggleItem value="ko" text="🇰🇷 한국어" />
        </Toggle>
      </div>
      {selectedView == 1 ? (
        <>
          <h1>KIT 1</h1>
          <ColGrid
            numCols={1}
            numColsSm={2}
            numColsLg={2}
            gapX="gap-x-2"
            gapY="gap-y-2"
          >
            <Col numColSpan={1} numColSpanLg={1}>
              <TempChart />
            </Col>
            <Col numColSpan={1} numColSpanLg={1}>
              <HumChart />
            </Col>
            <Col numColSpan={1} numColSpanLg={1}>
              <IllChart />
            </Col>
            <Col numColSpan={1} numColSpanLg={1}>
              <SoilChart />
            </Col>
          </ColGrid>
          <h1>KIT 2</h1>
          <ColGrid
            numCols={1}
            numColsSm={2}
            numColsLg={4}
            gapX="gap-x-2"
            gapY="gap-y-2"
          >
            <Col numColSpan={1} numColSpanLg={1}>
              <TempChart />
            </Col>
            <Col numColSpan={1} numColSpanLg={1}>
              <HumChart />
            </Col>
            <Col numColSpan={1} numColSpanLg={1}>
              <IllChart />
            </Col>
            <Col numColSpan={1} numColSpanLg={1}>
              <SoilChart />
            </Col>
            <SensorCard />
          </ColGrid>
        </>
      ) : (
        <Main />
      )}
    </>
  );
};
export default Main2;
