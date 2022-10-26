import React from 'react';
import { Col, Card, Text, Metric } from '@tremor/react';

export default () => {
  return (
    <>
      <Col>
        <Card>
          <Text>온도</Text>
          <Metric>Temperature</Metric>
        </Card>
      </Col>
      <Col>
        <Card>
          <Text>습도</Text>
          <Metric>Humidity</Metric>
        </Card>
      </Col>
      <Col>
        <Card>
          <Text>조도</Text>
          <Metric>Illuminance</Metric>
        </Card>
      </Col>
      <Col>
        <Card>
          <Text>토양 습도</Text>
          <Metric>Soil Humidity</Metric>
        </Card>
      </Col>
    </>
  );
};
