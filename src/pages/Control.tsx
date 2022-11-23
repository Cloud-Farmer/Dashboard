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
import { useRecoilValue } from 'recoil';
import { controlSensorAPI } from '../api/sensor';
import { useLanguage } from '../hooks';
import { controlState } from '../state/atoms';
import { languages } from '../util';

type Props = {
  kit: number;
};

const Control: React.FC<Props> = ({ kit }) => {
  const value = useRecoilValue(controlState);

  const [lang, setLang] = useLanguage();

  return (
    <div className="w-1/2 mb-5">
      <ColGrid numCols={2} gapX="gap-x-2" gapY="gap-y-2">
        <Col>
          <Card hFull>
            <div className="flex flex-row space-x-3 text-sky-300 items-start">
              <div>
                <p className="text-3xl font-extrabold m-0">
                  {languages.windowlang[lang]}
                </p>
                <Toggle
                  color="blue"
                  defaultValue={value.window.data}
                  handleSelect={(value: boolean) => {
                    controlSensorAPI(value, kit, 'window', lang);
                  }}
                  marginTop="mt-5"
                >
                  <ToggleItem value={true} text="On" />
                  <ToggleItem value={false} text="Off" />
                </Toggle>
              </div>
              <MdOutlineDoorSliding className="w-full h-full p-2" />
            </div>
          </Card>
        </Col>
        <Col>
          <Card hFull>
            <div className="flex flex-row space-x-3 text-pink-300 items-start">
              <div>
                <p className="text-3xl font-extrabold m-0">
                  {languages.pumplang[lang]}
                </p>
                <Toggle
                  color="blue"
                  defaultValue={value.pump.data}
                  handleSelect={(value: boolean) => {
                    controlSensorAPI(value, kit, 'pump', lang);
                  }}
                  marginTop="mt-5"
                >
                  <ToggleItem value={true} text="On" />
                  <ToggleItem value={false} text="Off" />
                </Toggle>
              </div>
              <MdWaterDrop className="w-full h-full p-5" />
            </div>
          </Card>
        </Col>
        <Col>
          <Card hFull>
            <div className="flex flex-row space-x-3 text-green-300 items-start">
              <div>
                <p className="text-3xl font-extrabold m-0">
                  {languages.fanlang[lang]}
                </p>
                <Toggle
                  color="blue"
                  defaultValue={value.fan.data}
                  handleSelect={(value: boolean) => {
                    controlSensorAPI(value, kit, 'fan', lang);
                  }}
                  marginTop="mt-5"
                >
                  <ToggleItem value={true} text="On" />
                  <ToggleItem value={false} text="Off" />
                </Toggle>
              </div>
              <FaFan className="w-full h-full p-5" />
            </div>
          </Card>
        </Col>
        <Col>
          <Card hFull>
            <div className="flex flex-row space-x-3 text-orange-300 items-start">
              <div>
                <p className="text-3xl font-extrabold m-0">
                  {languages.ledlang[lang]}
                </p>
                <Toggle
                  color="blue"
                  defaultValue={value.led.data}
                  handleSelect={(value: boolean) => {
                    controlSensorAPI(value, kit, 'led', lang);
                  }}
                  marginTop="mt-5"
                >
                  <ToggleItem value={true} text="On" />
                  <ToggleItem value={false} text="Off" />
                </Toggle>
              </div>
              <BsLightbulbFill className="w-full h-full p-5" />
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
