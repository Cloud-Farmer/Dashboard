import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { alertDataState } from '../state/atoms';
import { Title, List, ListItem, Card, Text } from '@tremor/react';
import { alertAPI } from '../api/sensor';

interface Props {
  kit: number;
  setKit: React.Dispatch<React.SetStateAction<number>>;
}

const Alert: React.FC<Props> = ({ kit }): any => {
  const [alertData, setAlertData] = useRecoilState(alertDataState);

  useEffect(() => {
    alertAPI(kit, 0, 12, setAlertData);
    console.log(alertData);
  }, [kit]);

  return (
    <Card maxWidth="max-w-none">
      <Title>Alert Log</Title>
      <List marginTop="mt-1.5">
        {alertData.alertResponseDtoList.map((item) => (
          <ListItem>
            <span>{'🔔'}</span>
            <span>
              <Text color="blue">{item.subject}</Text>
            </span>
            <span>
              <Text color="orange">{item.messageKR}</Text>
            </span>
            <span>{item.alertedTime}</span>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};
export default Alert;
