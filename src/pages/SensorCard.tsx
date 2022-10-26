import React from 'react';
import { Col, Card, Text, Metric, Flex, BadgeDelta } from '@tremor/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  humDataState,
  illDataState,
  soilDataState,
  tempDataState,
} from '../state/atoms';

export default () => {
  const tempData = useRecoilValue(tempDataState);
  const humData = useRecoilValue(humDataState);
  const illData = useRecoilValue(illDataState);
  const soilData = useRecoilValue(soilDataState);
  return (
    <>
      <Col>
        <Card hFull>
          <Flex alignItems="items-start">
            <Text>tempurature</Text>
            <BadgeDelta deltaType="unchanged" text="응애" />
          </Flex>
          <Flex
            justifyContent="justify-start"
            alignItems="items-baseline"
            spaceX="space-x-3"
            truncate={true}
          >
            <Metric>{tempData[tempData.length - 1].temperature}</Metric>
          </Flex>
        </Card>
      </Col>
      <Col>
        <Card hFull>
          <Text>습도</Text>
          <Metric>Humidity</Metric>
        </Card>
      </Col>
      <Col>
        <Card hFull>
          <Text>조도</Text>
          <Metric>Illuminance</Metric>
        </Card>
      </Col>
      <Col>
        <Card hFull>
          <Text>토양 습도</Text>
          <Metric>Soil Humidity</Metric>
        </Card>
      </Col>
    </>
  );
};
