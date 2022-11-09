import { Card, Toggle, ToggleItem } from '@tremor/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { getSensorAPI } from '../api/sensor';
import { useLanguage } from '../hooks';
import useKitId from '../hooks/useKitId';
import Cloudy from '../lottie/Cloudy';
import Rain from '../lottie/Rain';
import Snow from '../lottie/Snow';
import Sunny from '../lottie/sunny';
import Loading from '../assets/99257-loading-gif-animation.json';
import {
  humDataState,
  illDataState,
  soilDataState,
  tempDataState,
} from '../state/atoms';
import { LanguageType } from '../type';
import Lottie from 'react-lottie';
import { languages } from '../util';

interface Props {
  lang: LanguageType;
  setLang: (lang?: LanguageType | undefined) => void;
  kit: number;
  setKit: React.Dispatch<React.SetStateAction<number>>;
}

const Sidebar: React.FC<Props> = ({ lang, setLang, kit, setKit }) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const datestr = year + month + day;
  const [kitCookie, setKitCookie] = useKitId();
  const hours = date.getHours() - 2 + '00';
  const timestr = hours;
  const [change, setchange] = useState(0);
  const [temp, settemp] = useState();
  const [loading, setLoading] = useState(true);
  const [tempData, setTempData] = useRecoilState(tempDataState);
  const [humData, setHumData] = useRecoilState(humDataState);
  const [illData, setIllData] = useRecoilState(illDataState);
  const [soilData, setSoilData] = useRecoilState(soilDataState);

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
        settemp(response.data.response.body.items.item[3].obsrValue);
        setLoading(false);
      });
  };

  useEffect(() => {
    callWeather();
  }, []);

  useEffect(() => {
    console.log(temp);
  }, [temp]);

  useEffect(() => {
    console.log(change);
  }, [change]);

  const lottieOps = {
    loop: true,
    autoplay: true,
    animationData: Loading,
    renderSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="flex flex-col w-1/4 justify-start h-full fixed left-0">
      <div className="bg-white h-full">
        <h1 className="text-4xl m-0 text-center mt-10">{`${languages.logo[lang]}`}</h1>
        {loading ? (
          <Lottie options={lottieOps} isClickToPauseDisabled />
        ) : (
          <div className="flex flex-col py-20 px-5 text-center items-center justify-center">
            {(change == 0 && <Sunny />) ||
              (change == 1 && <Rain />) ||
              (change == 2 && <Snow />) ||
              (change == 3 && <Cloudy />)}
            <h1 className="text-4xl mb-5 font-light">{temp}C°</h1>

            <Toggle color="blue" defaultValue={lang} handleSelect={setLang}>
              <ToggleItem value="en" text="🇬🇧 English" />
              <ToggleItem value="ko" text="🇰🇷 한국어" />
            </Toggle>

            <Toggle
              color="zinc"
              defaultValue={kit}
              marginTop="mt-5"
              handleSelect={(value) => {
                setKit(value);
                setKitCookie(value);
                getSensorAPI(value, 'temperature', day, setTempData, lang);
                getSensorAPI(value, 'humidity', day, setHumData, lang);
                getSensorAPI(value, 'illuminance', day, setIllData, lang);
                getSensorAPI(value, 'soilHumidity', day, setSoilData, lang);
              }}
            >
              <ToggleItem value={1} text="KIT1" />
              <ToggleItem value={2} text="KIT2" />
            </Toggle>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
