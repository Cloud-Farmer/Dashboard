import React, { useEffect } from 'react';
import { Col, Card, Metric, Toggle, ToggleItem } from '@tremor/react';
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../constants/constants';
import useDidMountEffect from '../hooks/useDidMountEffect';

const Control = () => {
  const [window, setWindow] = useState(false);
  const [pump, setPump] = useState(false);
  const [fan, setFan] = useState(false);
  const [led, setLed] = useState(false);
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    setIsInit(true);
  }, []);

  //window control
  useDidMountEffect(() => {
    if (isInit) {
      if (window) {
        axios.post(API_URL + '/actuator', null, {
          params: {
            kitid: 1,
            sensor: 'window',
            available: 1,
          },
        });
        console.log('window on');
      } else {
        axios.post(API_URL + '/actuator', null, {
          params: {
            kitid: 1,
            sensor: 'window',
            available: 0,
          },
        });
        console.log('window off');
      }
    }
  }, [window]);
  //Pump control
  useEffect(() => {
    if (isInit) {
      if (pump) {
        axios.post(API_URL + '/actuator', null, {
          params: {
            kitid: 1,
            sensor: 'pump',
            available: 1,
          },
        });
        console.log('pump on');
      } else {
        axios.post(API_URL + '/actuator', null, {
          params: {
            kitid: 1,
            sensor: 'pump',
            available: 0,
          },
        });
        console.log('pump off');
      }
    }
  }, [pump]);
  //Fan control
  useEffect(() => {
    if (isInit) {
      if (fan) {
        axios.post(API_URL + '/actuator', null, {
          params: {
            kitid: 1,
            sensor: 'fan',
            available: 1,
          },
        });
        console.log('fan on');
      } else {
        axios.post(API_URL + '/actuator', null, {
          params: {
            kitid: 1,
            sensor: 'fan',
            available: 0,
          },
        });
        console.log('fan off');
      }
    }
  }, [fan]);
  //LED control
  useEffect(() => {
    if (isInit) {
      if (led) {
        axios.post(API_URL + '/actuator', null, {
          params: {
            kitid: 1,
            sensor: 'led',
            available: 1,
          },
        });
        console.log('led on');
      } else {
        axios.post(API_URL + '/actuator', null, {
          params: {
            kitid: 1,
            sensor: 'led',
            available: 0,
          },
        });
        console.log('led off');
      }
    }
  }, [led]);
  const changewindow = (value: any) => {
    setWindow(value);
  };
  const changepump = (value: any) => {
    setPump(value);
  };
  const changefan = (value: any) => {
    setFan(value);
  };
  const changeled = (value: any) => {
    setLed(value);
  };
  return (
    <>
      <Col>
        <Card hFull>
          <>
            <Metric>Window (창문)</Metric>
            <Toggle
              color="blue"
              defaultValue={window}
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
        <Card hFull>
          <Metric>Water pump (급수펌프)</Metric>
          <Toggle
            color="blue"
            defaultValue={pump}
            handleSelect={changepump}
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
            defaultValue={fan}
            handleSelect={changefan}
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
            defaultValue={led}
            handleSelect={changeled}
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
