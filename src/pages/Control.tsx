import {
  Card,
  Col,
  ColGrid,
  List,
  ListItem,
  Text,
  Title,
  Toggle,
  ToggleItem,
} from '@tremor/react';
import React from 'react';
import { BsLightbulbFill } from 'react-icons/bs';
import { FaFan } from 'react-icons/fa';
import { MdOutlineDoorSliding, MdWaterDrop } from 'react-icons/md';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { controlSensorAPI, controlSensorStatusAPI } from '../api/sensor';
import { useLanguage } from '../hooks';
import { controlState } from '../state/atoms';
import { languages } from '../util';

type Props = {
  kit: number;
};

const Control: React.FC<Props> = ({ kit }) => {
  const value = useRecoilValue(controlState);
  const setControlStatus = useSetRecoilState(controlState);
  const callAcutatorAPI = async () => {
    await controlSensorStatusAPI(kit, 'window', setControlStatus);
    await controlSensorStatusAPI(kit, 'pump', setControlStatus);
    await controlSensorStatusAPI(kit, 'fan', setControlStatus);
    await controlSensorStatusAPI(kit, 'led', setControlStatus);
  };

  const [lang, setLang] = useLanguage();

  return (
    <div className="w-1/2 mb-5">
      <ColGrid numCols={2} gapX="gap-x-2" gapY="gap-y-2">
        <Col>
          <Card hFull>
            <div className="flex flex-row space-x-3 text-emerald-300 items-start justify-between">
              <div className="w-1/2">
                <p className="text-2xl font-extrabold m-0">
                  {languages.windowlang[lang]}
                </p>
                <Toggle
                  color="blue"
                  defaultValue={value.window.data}
                  handleSelect={async (value: boolean) => {
                    await controlSensorAPI(value, kit, 'window', lang);
                    await callAcutatorAPI();
                  }}
                  marginTop="mt-5"
                >
                  <ToggleItem value={true} text="On" />
                  <ToggleItem value={false} text="Off" />
                </Toggle>
              </div>
              <MdOutlineDoorSliding className="text-6xl" />
            </div>
          </Card>
        </Col>
        <Col>
          <Card hFull>
            <div className="flex flex-row space-x-3 text-sky-300 items-start justify-between">
              <div className="w-1/2">
                <p className="text-2xl font-extrabold m-0">
                  {languages.pumplang[lang]}
                </p>
                <Toggle
                  color="blue"
                  defaultValue={value.pump.data}
                  handleSelect={async (value: boolean) => {
                    await controlSensorAPI(value, kit, 'pump', lang);
                    await callAcutatorAPI();
                  }}
                  marginTop="mt-5"
                >
                  <ToggleItem value={true} text="On" />
                  <ToggleItem value={false} text="Off" />
                </Toggle>
              </div>
              <MdWaterDrop className="text-6xl" />
            </div>
          </Card>
        </Col>
        <Col>
          <Card hFull>
            <div className="flex flex-row space-x-3 text-violet-300 items-start justify-between">
              <div className="w-1/2">
                <p className="text-2xl font-extrabold m-0">
                  {languages.fanlang[lang]}
                </p>
                <Toggle
                  color="blue"
                  defaultValue={value.fan.data}
                  handleSelect={async (value: boolean) => {
                    await controlSensorAPI(value, kit, 'fan', lang);
                    await callAcutatorAPI();
                  }}
                  marginTop="mt-5"
                >
                  <ToggleItem value={true} text="On" />
                  <ToggleItem value={false} text="Off" />
                </Toggle>
              </div>
              <FaFan className="text-6xl" />
            </div>
          </Card>
        </Col>
        <Col>
          <Card hFull>
            <div className="flex flex-row space-x-3 text-orange-300 items-start justify-between">
              <div className="w-1/2">
                <p className="text-2xl font-extrabold m-0">
                  {languages.ledlang[lang]}
                </p>
                <Toggle
                  color="blue"
                  defaultValue={value.led.data}
                  handleSelect={async (value: boolean) => {
                    await controlSensorAPI(value, kit, 'led', lang);
                    await callAcutatorAPI();
                  }}
                  marginTop="mt-5"
                >
                  <ToggleItem value={true} text="On" />
                  <ToggleItem value={false} text="Off" />
                </Toggle>
              </div>
              <BsLightbulbFill className="text-6xl" />
            </div>
          </Card>
        </Col>
      </ColGrid>

      <Card marginTop="mt-1.5">
        <Title>Actuator Log</Title>
        <List>
          <ListItem>
            {(value.fan.data === true && (
              <span>
                <Text color="orange">팬이 작동중입니다</Text>
              </span>
            )) || (
              <span>
                <Text color="orange">팬이 작동중이지 않습니다</Text>
              </span>
            )}
            <span>{value.fan.time}</span>
          </ListItem>
          <ListItem>
            {(value.led.data === true && (
              <span>
                <Text color="orange">조명이 작동중입니다</Text>
              </span>
            )) || (
              <span>
                <Text color="orange">조명이 작동중이지 않습니다</Text>
              </span>
            )}
            <span>{value.led.time}</span>
          </ListItem>
          <ListItem>
            {(value.pump.data === true && (
              <span>
                <Text color="orange">급수 펌프 작동중입니다</Text>
              </span>
            )) || (
              <span>
                <Text color="orange">급수 펌프가 작동중이지 않습니다</Text>
              </span>
            )}
            <span>{value.pump.time}</span>
          </ListItem>
          <ListItem>
            {(value.window.data === true && (
              <span>
                <Text color="orange">창문이 작동중입니다</Text>
              </span>
            )) || (
              <span>
                <Text color="orange">창문이 작동중이지 않습니다</Text>
              </span>
            )}
            <span>{value.window.time}</span>
          </ListItem>
        </List>
      </Card>
    </div>
  );
};
export default Control;
