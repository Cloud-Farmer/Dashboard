type LanguageText = {
  ko: string;
  en: string;
};

interface LanguageTextList {
  [key: string]: LanguageText;
}

const languages: LanguageTextList = {
  header: {
    ko: '안녕하세요',
    en: 'Hello world!',
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
};

export default languages;
