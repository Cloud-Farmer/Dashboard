import React, { useEffect } from 'react';
import { Col, Card, Metric, Toggle, ToggleItem, ColGrid } from '@tremor/react';
import { useState } from 'react';
import { controlSensorAPI, controlSensorStatusAPI } from '../api/sensor';
import { useLanguage } from '../hooks';
import { languages } from '../util';
import { getCookie } from '../util/cookie';

type Props = {
  kit: number;
};

const Control: React.FC<Props> = ({ kit }) => {
  const initValue = {
    window: undefined,
    pump: undefined,
    fan: undefined,
    led: undefined,
  };

  const [lang, setLang] = useLanguage();
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    const callAPI = async () => {
      await controlSensorStatusAPI(kit, 'window', setValue);
      await controlSensorStatusAPI(kit, 'pump', setValue);
      await controlSensorStatusAPI(kit, 'fan', setValue);
      await controlSensorStatusAPI(kit, 'led', setValue);
      await setLoading(false);
    };
    console.log(kit);
    kit && callAPI();
  }, [kit]);

  // useEffect(() => {
  //   console.log(value);
  // }, [value]);

  return (
    <Col numColSpan={1} numColSpanLg={2}>
      {!loading && (
        <ColGrid numCols={2} gapX="gap-x-2" gapY="gap-y-2">
          <Col>
            <Card hFull>
              <Metric>{languages.windowlang[lang]}</Metric>
              <Toggle
                color="blue"
                defaultValue={value.window}
                handleSelect={(value: boolean) => {
                  controlSensorAPI(value, kit, 'window', lang);
                }}
                marginTop="mt-5"
              >
                <ToggleItem value={true} text="On" />
                <ToggleItem value={false} text="Off" />
              </Toggle>
            </Card>
          </Col>
          <Col>
            <Card hFull>
              <Metric>{languages.pumplang[lang]}</Metric>

              <Toggle
                color="blue"
                defaultValue={value.pump}
                handleSelect={(value: boolean) => {
                  controlSensorAPI(value, kit, 'pump', lang);
                }}
                marginTop="mt-5"
              >
                <ToggleItem value={true} text="On" />
                <ToggleItem value={false} text="Off" />
              </Toggle>
            </Card>
          </Col>
          <Col>
            <Card hFull>
              <Metric>{languages.fanlang[lang]}</Metric>
              <Toggle
                color="blue"
                defaultValue={value.fan}
                handleSelect={(value: boolean) => {
                  controlSensorAPI(value, kit, 'fan', lang);
                }}
                marginTop="mt-5"
              >
                <ToggleItem value={true} text="On" />
                <ToggleItem value={false} text="Off" />
              </Toggle>
            </Card>
          </Col>
          <Col>
            <Card hFull>
              <Metric>{languages.ledlang[lang]}</Metric>
              <Toggle
                color="blue"
                defaultValue={value.led}
                handleSelect={(value: boolean) => {
                  controlSensorAPI(value, kit, 'led', lang);
                }}
                marginTop="mt-5"
              >
                <ToggleItem value={true} text="On" />
                <ToggleItem value={false} text="Off" />
              </Toggle>
            </Card>
          </Col>
        </ColGrid>
      )}
    </Col>
  );
};
export default Control;
