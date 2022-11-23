import { Card, List, ListItem, Text, Title } from '@tremor/react';
import { useRecoilValue } from 'recoil';
import { alertDataState } from '../state/atoms';

const Alert = (): any => {
  const alertData = useRecoilValue(alertDataState);

  return (
    <div className="w-1/2 mb-5">
      <Card maxWidth="max-w-none">
        <Title>Alert Log</Title>
        <List marginTop="mt-1.5">
          {alertData.alertResponseDtoList.map((item) => (
            <ListItem key={item.alertedTime}>
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
    </div>
  );
};
export default Alert;
