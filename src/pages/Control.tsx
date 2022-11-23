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
            <div className="flex flex-row space-x-3 text-blue-300 items-start">
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
            {
              <span>
                <Text color={value.fan.data ? 'blue' : 'orange'}>
                  {value.fan.data
                    ? languages.actuatorfan[lang]
                    : languages.noactuatorfan[lang]}
                </Text>
              </span>
            }
            {
              <span>
                <Text color={value.fan.data ? 'blue' : 'orange'}>
                  {value.fan.time}
                </Text>
              </span>
            }
          </ListItem>
          <ListItem>
            {
              <span>
                <Text color={value.led.data ? 'blue' : 'orange'}>
                  {value.led.data
                    ? languages.actuatorled[lang]
                    : languages.noactuatorled[lang]}
                </Text>
              </span>
            }
            {
              <span>
                <Text color={value.led.data ? 'blue' : 'orange'}>
                  {value.led.time}
                </Text>
              </span>
            }
          </ListItem>
          <ListItem>
            {
              <span>
                <Text color={value.pump.data ? 'blue' : 'orange'}>
                  {value.pump.data
                    ? languages.actuatorpump[lang]
                    : languages.noactuatorpump[lang]}
                </Text>
              </span>
            }
            {
              <span>
                <Text color={value.pump.data ? 'blue' : 'orange'}>
                  {value.pump.time}
                </Text>
              </span>
            }
          </ListItem>
          <ListItem>
            {
              <span>
                <Text color={value.window.data ? 'blue' : 'orange'}>
                  {value.window.data
                    ? languages.actuatorwindow[lang]
                    : languages.noactuatorwindow[lang]}
                </Text>
              </span>
            }
            {
              <span>
                <Text color={value.window.data ? 'blue' : 'orange'}>
                  {value.window.time}
                </Text>
              </span>
            }
          </ListItem>
        </List>
      </Card>
    </div>
  );
};
export default Control;
