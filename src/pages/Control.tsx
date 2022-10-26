import React, { useCallback, useEffect } from 'react';
import { Col, Card, Metric, Toggle, ToggleItem } from '@tremor/react';
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../constants/constants';
import useDidMountEffect from '../hooks/useDidMountEffect';

const Control = () => {
  //const [showCard, setShowCard] = useState(true);
  const [control, setControl] = useState(false);
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    setIsInit(true);
  }, []);
  useDidMountEffect(() => {
    if (isInit) {
      if (control) {
        axios.post(API_URL + '/actuator', null, {
          params: {
            kitid: 1,
            sensor: 'motor',
            available: 1,
          },
        });
        console.log('on');
      } else {
        axios.post(API_URL + '/actuator', null, {
          params: {
            kitid: 1,
            sensor: 'motor',
            available: 0,
          },
        });
        console.log('off');
      }
    }
  }, [control]);
  const changewindow = (value: any) => {
    setControl(value);
  };
  return (
    <>
      <Col>
        <Card>
          <>
            <Metric>Window (창문)</Metric>
            <Toggle
              color="blue"
              defaultValue={control}
              handleSelect={changewindow}
              marginTop="mt-5"
            >
              <ToggleItem value={true} text="On" />
              <ToggleItem value={false} text="Off" />
            </Toggle>
          </>
        </Card>
      </Col>
      <Col>
        <Card>
          <Metric>Water pump (급수펌프)</Metric>
          <Toggle
            color="blue"
            defaultValue={control}
            handleSelect={changewindow}
            marginTop="mt-5"
          >
            <ToggleItem value={true} text="On" />
            <ToggleItem value={false} text="Off" />
          </Toggle>
        </Card>
      </Col>
      <Col>
        <Card>
          <Metric>Fan (팬)</Metric>
          <Toggle
            color="blue"
            defaultValue={control}
            handleSelect={changewindow}
            marginTop="mt-5"
          >
            <ToggleItem value={true} text="On" />
            <ToggleItem value={false} text="Off" />
          </Toggle>
        </Card>
      </Col>
      <Col>
        <Card>
          <Metric>LED (조명)</Metric>
          <Toggle
            color="blue"
            defaultValue={control}
            handleSelect={changewindow}
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
