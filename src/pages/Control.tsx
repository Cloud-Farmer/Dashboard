import React, { useEffect } from 'react';
import {
  Col,
  Card,
  Metric,
  Toggle,
  ToggleItem,
  ColGrid,
  Title,
  List,
  ListItem,
  Text,
} from '@tremor/react';
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
  const inittime = {
    window: '',
    pump: '',
    fan: '',
    led: '',
  };

  const [lang, setLang] = useLanguage();
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(initValue);
  const [time, setTime] = useState(inittime);

  useEffect(() => {
    const callAPI = async () => {
      await controlSensorStatusAPI(kit, 'window', setValue, setTime);
      await controlSensorStatusAPI(kit, 'pump', setValue, setTime);
      await controlSensorStatusAPI(kit, 'fan', setValue, setTime);
      await controlSensorStatusAPI(kit, 'led', setValue, setTime);
      await setLoading(false);
    };
    console.log(time);
    kit && callAPI();
  }, [kit]);

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
      <Card marginTop="mt-1.5">
        <Title>Actuator Log</Title>
        <List>
          <ListItem>
            {(value.fan === true && (
              <span>
                <Text color="orange">팬이 작동중입니다</Text>
              </span>
            )) || (
              <span>
                <Text color="orange">팬이 작동중이지 않습니다</Text>
              </span>
            )}
            <span>{time.fan}</span>
          </ListItem>
          <ListItem>
            {(value.led === true && (
              <span>
                <Text color="orange">조명이 작동중입니다</Text>
              </span>
            )) || (
              <span>
                <Text color="orange">조명이 작동중이지 않습니다</Text>
              </span>
            )}
            <span>{time.led}</span>
          </ListItem>
          <ListItem>
            {(value.pump === true && (
              <span>
                <Text color="orange">급수 펌프 작동중입니다</Text>
              </span>
            )) || (
              <span>
                <Text color="orange">급수 펌프가 작동중이지 않습니다</Text>
              </span>
            )}
            <span>{time.pump}</span>
          </ListItem>
          <ListItem>
            {(value.window === true && (
              <span>
                <Text color="orange">창문이 작동중입니다</Text>
              </span>
            )) || (
              <span>
                <Text color="orange">창문이 작동중이지 않습니다</Text>
              </span>
            )}
            <span>{time.window}</span>
          </ListItem>
        </List>
      </Card>
    </Col>
  );
};
export default Control;
