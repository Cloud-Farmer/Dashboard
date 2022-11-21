import React, { useState } from 'react';
import { ColGrid, Col } from '@tremor/react';
import Control from './Control';
import { useLanguage } from '../hooks';
import APIChart from './APIChart';
import Weather from './SideBar';
import Alert from '../components/Alert';

const Main = () => {
  const [lang, setLang] = useLanguage();
  const [kit, setKit] = useState(1);

  return (
    <div className="h-[100vh]">
      <Weather lang={lang} setLang={setLang} kit={kit} setKit={setKit} />
      <div className="flex flex-row space-x-3 items-stretch h-full justify-end pl-5 pr-2">
        <div className="h-full w-[calc(74%)] px-5 py-10">
          <ColGrid numCols={4} gapX="gap-x-2" gapY="gap-y-2">
            <Col numColSpan={1} numColSpanLg={4}>
              <APIChart kit={kit} setKit={setKit} />
            </Col>
            <Control kit={kit} />
            <Col numColSpan={1} numColSpanLg={2}>
              <Alert kit={kit} setKit={setKit} />
            </Col>
          </ColGrid>
        </div>
      </div>
    </div>
  );
};
export default Main;
