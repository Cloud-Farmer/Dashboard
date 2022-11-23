import { Card, List, ListItem, Text, Title } from '@tremor/react';
import { useRecoilValue } from 'recoil';
import { alertDataState } from '../state/atoms';
import { useLanguage } from '../hooks';
import { languages } from '../util';

const Alert = (): any => {
  const alertData = useRecoilValue(alertDataState);
  const [lang, setLang] = useLanguage();
  const colors: any = ['red', 'blue', 'orange', 'green'];

  return (
    <div className="w-1/2 mb-5">
      <Card maxWidth="max-w-none">
        <Title>Alert Log</Title>
        <List marginTop="mt-1.5">
          {alertData.alertResponseDtoList.map((item, index) => (
            <ListItem key={item.alertedTime + index}>
              <span>{'🔔'}</span>
              <span>
                <Text
                  color={
                    (item.subject == 'temperature' && colors[0]) ||
                    (item.subject == 'humdity' && colors[1]) ||
                    (item.subject == 'illuminance' && colors[2]) ||
                    (item.subject == 'soilHumidity' && colors[3])
                  }
                >
                  {item.subject}
                </Text>
              </span>
              {(lang == 'ko' && (
                <span>
                  <Text
                    color={
                      (item.subject == 'temperature' && colors[0]) ||
                      (item.subject == 'humdity' && colors[1]) ||
                      (item.subject == 'illuminance' && colors[2]) ||
                      (item.subject == 'soilHumidity' && colors[3])
                    }
                  >
                    {item.messageKR}
                  </Text>
                </span>
              )) || (
                <span>
                  <Text
                    color={
                      (item.subject == 'temperature' && colors[0]) ||
                      (item.subject == 'humdity' && colors[1]) ||
                      (item.subject == 'illuminance' && colors[2]) ||
                      (item.subject == 'soilHumidity' && colors[3])
                    }
                  >
                    {item.messageEng}
                  </Text>
                </span>
              )}
              <span>
                <Text
                  color={
                    (item.subject == 'temperature' && colors[0]) ||
                    (item.subject == 'humdity' && colors[1]) ||
                    (item.subject == 'illuminance' && colors[2]) ||
                    (item.subject == 'soilHumidity' && colors[3])
                  }
                >
                  {item.alertedTime}
                </Text>
              </span>
            </ListItem>
          ))}
        </List>
      </Card>
    </div>
  );
};
export default Alert;
