import React from 'react';
import { Col, Card, Text, Metric, Flex, BadgeDelta } from '@tremor/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  humDataState,
  illDataState,
  soilDataState,
  tempDataState,
} from '../state/atoms';
import { useLanguage } from '../hooks';
import { languages } from '../util';

export default () => {
  const tempData = useRecoilValue(tempDataState);
  const humData = useRecoilValue(humDataState);
  const illData = useRecoilValue(illDataState);
  const soilData = useRecoilValue(soilDataState);
  const [lang, setLang] = useLanguage();

  return (
    <>
      <Col>
        <Card hFull>
          <Flex alignItems="items-start">
            <Metric>{languages.temperaturecard[lang]}</Metric>
            <BadgeDelta deltaType="unchanged" text={languages.average[lang]} />
          </Flex>
          <Flex
            justifyContent="justify-start"
            alignItems="items-baseline"
            spaceX="space-x-3"
            truncate={true}
          >
            <Metric marginTop="mt-2">
              {tempData[tempData.length - 1].temperature}C°
            </Metric>
          </Flex>
        </Card>
      </Col>
      <Col>
        <Card hFull>
          <Flex alignItems="items-start">
            <Metric>{languages.humiditycard[lang]}</Metric>
            <BadgeDelta deltaType="unchanged" text={languages.average[lang]} />
          </Flex>
          <Flex
            justifyContent="justify-start"
            alignItems="items-baseline"
            spaceX="space-x-3"
            truncate={true}
          >
            <Metric marginTop="mt-2">
              {humData[humData.length - 1].humidity}%
            </Metric>
          </Flex>
        </Card>
      </Col>
      <Col>
        <Card hFull>
          <Flex alignItems="items-start">
            <Metric>{languages.illuminancecard[lang]}</Metric>
            <BadgeDelta deltaType="unchanged" text={languages.average[lang]} />
          </Flex>
          <Flex
            justifyContent="justify-start"
            alignItems="items-baseline"
            spaceX="space-x-3"
            truncate={true}
          >
            <Metric marginTop="mt-2">
              {illData[illData.length - 1].illuminance}lx
            </Metric>
          </Flex>
        </Card>
      </Col>
      <Col>
        <Card hFull>
          <Flex alignItems="items-start">
            <Metric>{languages.soilhumiditycard[lang]}</Metric>
            <BadgeDelta deltaType="unchanged" text={languages.average[lang]} />
          </Flex>
          <Flex
            justifyContent="justify-start"
            alignItems="items-baseline"
            spaceX="space-x-3"
            truncate={true}
          >
            <Metric marginTop="mt-2">
              {soilData[soilData.length - 1].soilHumidity}%
            </Metric>
          </Flex>
        </Card>
      </Col>
    </>
  );
};
