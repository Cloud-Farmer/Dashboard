type LanguageText = {
  ko: string;
  en: string;
};

interface LanguageTextList {
  [key: string]: LanguageText;
}

const languages: LanguageTextList = {
  header: {
    ko: '키트 1 안녕하세요!',
    en: 'Hello Kit 1!',
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
    ko: '스마트팜 대시보드 by CloudFarmer',
    en: 'SmartFarm Dashboard by CloudFarmer',
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
    ko: '토양습도',
    en: 'Soil Humidity',
  },
  windowlang: {
    ko: '창문',
    en: 'Window',
  },
  pumplang: {
    ko: '급수 펌프',
    en: 'Water Pump',
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
};

export default languages;
