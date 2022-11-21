import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { alertDataState } from '../state/atoms';
import { Title, List, ListItem, Card, Text } from '@tremor/react';
import { alertAPI } from '../api/sensor';

interface Props {
  kit: number;
  setKit: React.Dispatch<React.SetStateAction<number>>;
}

const Alert: React.FC<Props> = ({ kit, setKit }): any => {
  const [alertData, setAlertData] = useRecoilState(alertDataState);

  useEffect(() => {
    alertAPI(kit, 0, 10, setAlertData);
    console.log(alertData);
  }, [kit]);

  return (
    <Card maxWidth="max-w-none">
      <Title>Alert</Title>
      <List>
        {alertData.alertResponseDtoList.map((item) => (
          <ListItem>
            <span>{'🔔'}</span>
            <span>
              <Text color="blue">{item.subject}</Text>
            </span>
            <span>{item.message}</span>
            <span>
              <Text color="orange">{item.status}</Text>
            </span>
            <span>{item.alertedTime}</span>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};
export default Alert;
