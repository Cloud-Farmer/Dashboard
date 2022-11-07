import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cloudy from '../lottie/Cloudy';
import Rain from '../lottie/Rain';
import Snow from '../lottie/Snow';
import Sunny from '../lottie/sunny';

export default (): any => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const datestr = year + month + day;

  const hours = date.getHours() - 1 + '00';
  const timestr = hours;
  const [change, setchange] = useState(0);
  const [temp, settemp] = useState('');

  let url = '/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';

  const callWeather = async () => {
    await axios
      .get(url, {
        params: {
          ServiceKey:
            'JmupyLFc3jeyKQbiRTPX64a3wwJ85VpAkTQqUBemPr4OrupP+TlBZTjb1GPzGbEEQmbYCzKLw0XlHZ0m4K1fFQ==',
          pageNo: 1,
          numOfRows: 20,
          dataType: 'JSON',
          base_date: datestr,
          base_time: timestr,
          nx: 95,
          ny: 77,
        },
      })
      .then((response) => {
        setchange(response.data.response.body.items.item[0].obsrValue);
        settemp(temp + response.data.response.body.items.item[3].obsrValue);
      });
  };

  useEffect(() => {
    callWeather();
  }, []);
  useEffect(() => {
    console.log(change);
  }, [change]);
  useEffect(() => {
    console.log(temp);
  }, [temp]);

  if (change == 0) {
    return (
      <>
        <Sunny />
        <h1>{temp} C</h1>
      </>
    );
  } else if (change == 1) {
    return (
      <>
        <Rain />
        <h1>{temp} C</h1>
      </>
    );
  } else if (change == 3) {
    return (
      <>
        <Snow />
        <h1>{temp} C</h1>
      </>
    );
  } else if (change == 5) {
    return (
      <>
        <Cloudy />
        <h1>{temp} C</h1>
      </>
    );
  }
};
