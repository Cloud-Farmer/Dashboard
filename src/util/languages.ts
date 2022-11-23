type LanguageText = {
  ko: string;
  en: string;
};

interface LanguageTextList {
  [key: string]: LanguageText;
}

const languages: LanguageTextList = {
  header: {
    ko: ' 안녕하세요!',
    en: ' Hello!',
  },
  allchart: {
    ko: '모든 차트',
    en: 'All Chart',
  },
  result_send: {
    ko: '전송이 완료되었습니다',
    en: 'signal send',
  },
  btn_refresh: {
    ko: '새로고침',
    en: 'Refresh',
  },
  logo: {
    ko: '스마트팜 대시보드',
    en: 'SmartFarm Dashboard',
  },
  average: {
    ko: '평균',
    en: 'Average',
  },
  temperaturecard: {
    ko: '온도',
    en: 'Tempurature',
  },
  humiditycard: {
    ko: '습도',
    en: 'Humidity',
  },
  illuminancecard: {
    ko: '조도',
    en: 'Illuminance',
  },
  soilhumiditycard: {
    ko: '토양 습도',
    en: 'Soil Humidity',
  },
  windowlang: {
    ko: '창문',
    en: 'Window',
  },
  pumplang: {
    ko: '급수펌프',
    en: 'Pump',
  },
  fanlang: {
    ko: '팬',
    en: 'Fan',
  },
  ledlang: {
    ko: '조명',
    en: 'LED',
  },
  temptoggle: {
    ko: '온도 차트',
    en: 'Temperature Chart',
  },
  humtoggle: {
    ko: '습도 차트',
    en: 'Humidity Chart',
  },
  illtoggle: {
    ko: '조도 차트',
    en: 'Illuminance Chart',
  },
  soiltoggle: {
    ko: '토양 습도 차트',
    en: 'Soil Humidity Chart',
  },
  areatoggle: {
    ko: '영역 차트',
    en: 'AreaChart',
  },
  linetoggle: {
    ko: '라인 차트',
    en: 'LineChart',
  },
  frequency_1d: {
    ko: '1일',
    en: '1D',
  },
  frequency_1w: {
    ko: '1주',
    en: '1W',
  },
  frequency_3mo: {
    ko: '3달',
    en: '3M',
  },
  frequency_1y: {
    ko: '1년',
    en: '1Y',
  },
  autolang: {
    ko: '자동 제어 모드',
    en: 'Auto Control Mode',
  },
  weatherlocation: {
    ko: '김해시 활천동',
    en: 'Hwalcheon-dong, Gimhae-si',
  },
  langmangementlang: {
    ko: '언어 관리',
    en: 'Language Management',
  },
  kitmangementlang: {
    ko: '키트 관리',
    en: 'Kit Management',
  },
  actuatorfan: {
    ko: '팬이 작동중입니다',
    en: 'Fan Working',
  },
  actuatorled: {
    ko: '조명이 작동중입니다',
    en: 'LED Working',
  },
  actuatorpump: {
    ko: '급수 펌프가 작동중입니다',
    en: 'Pump Working',
  },
  actuatorwindow: {
    ko: '창문이 작동중입니다',
    en: 'Window Working',
  },
  noactuatorfan: {
    ko: '팬이 작동중이지 않습니다',
    en: 'Fan Not Working',
  },
  noactuatorled: {
    ko: '조명이 작동중이지 않습니다',
    en: 'LED Not Working',
  },
  noactuatorpump: {
    ko: '급수 펌프가 작동중이지 않습니다',
    en: 'Pump Not Working',
  },
  noactuatorwindow: {
    ko: '창문이 작동중이지 않습니다',
    en: 'Window Not Working',
  },
  updated: {
    ko: '최신 업데이트',
    en: 'updated',
  },
  datafetched: {
    ko: '데이터 로딩 완료',
    en: 'Data fetched',
  },
  add: {
    ko: '추가',
    en: 'ADD',
  },
  remove: {
    ko: '삭제',
    en: 'REMOVE',
  },
  setupalert: {
    ko: '알람 설정',
    en: 'SETUP ALERT',
  },
};

export default languages;
