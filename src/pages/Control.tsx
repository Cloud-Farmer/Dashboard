import React, { useEffect } from 'react';
import { Col, Card, Metric, Toggle, ToggleItem } from '@tremor/react';
import { useState } from 'react';
import { controlSensorAPI, controlSensorStatusAPI } from '../api/sensor';
import { useLanguage } from '../hooks';
import { languages } from '../util';

const Control = () => {
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
      await controlSensorStatusAPI(1, 'window', value, setValue);
      await controlSensorStatusAPI(1, 'pump', value, setValue);
      await controlSensorStatusAPI(1, 'fan', value, setValue);
      await controlSensorStatusAPI(1, 'led', value, setValue);
      await setLoading(false);
    };
    callAPI();
  }, []);

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    !loading && (
      <>
        <Col>
          <Card hFull>
            <>
              <Metric>{languages.windowlang[lang]}</Metric>
              <Toggle
                color="blue"
                defaultValue={value.window}
                handleSelect={(value: boolean) =>
                  controlSensorAPI(value, 1, 'window', lang)
                }
                marginTop="mt-5"
              >
                <ToggleItem value={true} text="On" />
                <ToggleItem value={false} text="Off" />
              </Toggle>
            </>
          </Card>
        </Col>
        <Col>
          <Card hFull>
            <Metric>{languages.pumplang[lang]}</Metric>
            <Toggle
              color="blue"
              defaultValue={value.pump}
              handleSelect={(value: boolean) =>
                controlSensorAPI(value, 1, 'pump', lang)
              }
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
              handleSelect={(value: boolean) =>
                controlSensorAPI(value, 1, 'fan', lang)
              }
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
              handleSelect={(value: boolean) =>
                controlSensorAPI(value, 1, 'led', lang)
              }
              marginTop="mt-5"
            >
              <ToggleItem value={true} text="On" />
              <ToggleItem value={false} text="Off" />
            </Toggle>
          </Card>
        </Col>
      </>
    )
  );
};
export default Control;
