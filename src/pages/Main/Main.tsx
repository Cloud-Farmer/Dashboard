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
import TestChart1 from '../Example/TestChart1';
import TextChart2 from '../Example/TextChart2';
import TestTable from '../Example/TestTable';
import { useLanguage } from '../../hooks';

const Main = () => {
  const [lang, setLang] = useLanguage();
  return (
    <>
      <Toggle
        color="zinc"
        defaultValue={lang}
        handleSelect={(value: 'en' | 'ko') => setLang(value)}
      >
        <ToggleItem value="en" text="ENGLISH" />
        <ToggleItem value="ko" text="KOREAN" />
      </Toggle>{' '}
      <ColGrid
        numCols={1}
        numColsSm={2}
        numColsLg={3}
        gapX="gap-x-2"
        gapY="gap-y-2"
      >
        <Col numColSpan={1} numColSpanLg={2}>
          <TestChart1 />
        </Col>
        <Col>
          <TextChart2 />
        </Col>
        <Col numColSpan={3} numColSpanLg={3}>
          <TestTable />
        </Col>
        <Col>
          <Card>
            <Text>Title</Text>
            <Metric>KPI 3</Metric>
          </Card>
        </Col>
        <Card>
          <Text>Title</Text>
          <Metric>KPI 4</Metric>
        </Card>
        <Card>
          <Text>Title</Text>
          <Metric>KPI 5</Metric>
        </Card>
      </ColGrid>
    </>
  );
};
export default Main;
