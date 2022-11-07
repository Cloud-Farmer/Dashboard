import React, { useState } from 'react';
import Rain from '../lottie/Rain';
import Sunny from '../lottie/sunny';

export default (): any => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const datestr = year + month + day;

  const hours = date.getHours() - 1 + '00';
  //const minutes = ('0' + (date.getMinutes() - 40)).slice(-2);
  const timestr = hours; // + minutes;
  const [change, setchange] = useState(0);

  let xhr = new XMLHttpRequest();
  let url =
    'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';
  let datakey =
    'JmupyLFc3jeyKQbiRTPX64a3wwJ85VpAkTQqUBemPr4OrupP%2BTlBZTjb1GPzGbEEQmbYCzKLw0XlHZ0m4K1fFQ%3D%3D';
  let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + datakey;
  queryParams +=
    '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
  queryParams +=
    '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('20');
  queryParams +=
    '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
  queryParams +=
    '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(datestr);
  queryParams +=
    '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(timestr);
  queryParams +=
    '&' + encodeURIComponent('nx') + '=' + encodeURIComponent('95');
  queryParams +=
    '&' + encodeURIComponent('ny') + '=' + encodeURIComponent('77');
  let weatherdata = url + queryParams;
  xhr.open('GET', weatherdata);
  xhr.onreadystatechange = function Weather() {
    if (this.readyState == 4) {
      //console.log(this.responseText);
      let response = this.responseText;
      let type = JSON.parse(response);
      //console.log(type.response.body.items.item);
      console.log('온도 :' + type.response.body.items.item[3].obsrValue);
      //console.log('하늘상태 : ' + type.response.body.items.item[0].obsrValue);
      if (type.response.body.items.item[0].obsrValue == '0') {
        console.log('맑음');
      } else if (type.response.body.items.item[0].obsrValue == '1') {
        console.log('비');
      } else if (type.response.body.items.item[0].obsrValue == '3') {
        console.log('눈');
      } else if (type.response.body.items.item[0].obsrValue == '5') {
        console.log('흐림/빗방울');
      }
    }
  };
  xhr.send();
};
