import React, { useEffect } from 'react';
import { Col, Card, Metric, Toggle, ToggleItem } from '@tremor/react';
import { useState } from 'react';
import { controlSensorAPI, controlSensorStatusAPI } from '../api/sensor';
import { useLanguage } from '../hooks';

const Control = () => {
  const initValue = {
    window: false,
    pump: false,
    fan: false,
    led: false,
  };

  const [lang, setLang] = useLanguage();
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    controlSensorStatusAPI(setValue);
  }, []);

  return (
    <>
      <Col>
        <Card hFull>
          <>
            <Metric>Window (창문)</Metric>
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
          <Metric>Water pump (급수펌프)</Metric>
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
          <Metric>Fan (팬)</Metric>
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
          <Metric>LED (조명)</Metric>
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
  );
};
export default Control;
