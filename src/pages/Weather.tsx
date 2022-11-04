import React from 'react';

export default () => {
  const std_time = new Date();
  std_time.setMinutes(std_time.getMinutes() - 30);
  const today = std_time.getDate;
  const time = std_time.getTime;
  let xhr = new XMLHttpRequest();
  let url =
    'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';
  let queryParams =
    '?' +
    encodeURIComponent('serviceKey') +
    '=' +
    'JmupyLFc3jeyKQbiRTPX64a3wwJ85VpAkTQqUBemPr4OrupP%2BTlBZTjb1GPzGbEEQmbYCzKLw0XlHZ0m4K1fFQ%3D%3D';
  queryParams +=
    '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
  queryParams +=
    '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('12');
  queryParams +=
    '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
  queryParams +=
    '&' +
    encodeURIComponent('base_date') +
    '=' +
    encodeURIComponent(String(today));
  queryParams +=
    '&' +
    encodeURIComponent('base_time') +
    '=' +
    encodeURIComponent(String(time));
  queryParams +=
    '&' + encodeURIComponent('nx') + '=' + encodeURIComponent('55');
  queryParams +=
    '&' + encodeURIComponent('ny') + '=' + encodeURIComponent('127');
  xhr.open('GET', url + queryParams);
  xhr.onreadystatechange = function Weather() {
    if (this.readyState == 4) {
      console.log(this.responseText);
    }
  };
  xhr.send('');
};
