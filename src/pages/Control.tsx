import React, { useEffect } from 'react';
import { Col, Card, Metric, Toggle, ToggleItem } from '@tremor/react';
import { useState } from 'react';
import { controlSensorAPI, controlSensorStatusAPI } from '../api/sensor';
import { useLanguage } from '../hooks';
import { languages } from '../util';
import { useCookies } from 'react-cookie';
import useKitId from '../hooks/useKitId';
import { getCookie } from '../util/cookie';

const Control = (props: any) => {
  const initValue = {
    window: undefined,
    pump: undefined,
    fan: undefined,
    led: undefined,
  };

  const [lang, setLang] = useLanguage();
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(initValue);
  const [kitId, setKit] = useKitId(); //useKitId();
  const [test, setTest] = useState(props);

  useEffect(() => {
    const callAPI = async () => {
      await controlSensorStatusAPI(kitId, 'window', value, setValue);
      await controlSensorStatusAPI(kitId, 'pump', value, setValue);
      await controlSensorStatusAPI(kitId, 'fan', value, setValue);
      await controlSensorStatusAPI(kitId, 'led', value, setValue);
      await setLoading(false);
      setLoading(false);
    };
    callAPI();
  }, []);

  // useEffect(() => {
  //   console.log(value);
  // }, [value]);

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
                handleSelect={(value: boolean) => {
                  const tempKitId = getCookie('kitId');
                  controlSensorAPI(value, tempKitId, 'window', lang);
                }}
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
              handleSelect={(value: boolean) => {
                const tempKitId = getCookie('kitId');
                controlSensorAPI(value, tempKitId, 'pump', lang);
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
                const tempKitId = getCookie('kitId');
                controlSensorAPI(value, tempKitId, 'fan', lang);
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
                const tempKitId = getCookie('kitId');
                controlSensorAPI(value, tempKitId, 'led', lang);
              }}
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
