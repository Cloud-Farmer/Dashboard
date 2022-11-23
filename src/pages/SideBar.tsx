import { WEATHER_URL } from '@src/constants/constants';
import {
  Button,
  SelectBox,
  SelectBoxItem,
  Toggle,
  ToggleItem,
} from '@tremor/react';
import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import { useRecoilState } from 'recoil';
import {
  AutocontrolAPI,
  AutocontrolStatusAPI,
  deleteKits,
  getAllKits,
} from '../api/sensor';
import Loading from '../assets/99257-loading-gif-animation.json';
import Modal from '../components/Modal';
import Cloudy from '../lottie/Cloudy';
import Rain from '../lottie/Rain';
import Snow from '../lottie/Snow';
import Sunny from '../lottie/sunny';
import { allkitsState, newkitState } from '../state/atoms';
import { LanguageType } from '../type';
import { languages } from '../util';
import AlertModal from './AertModal';

interface Props {
  lang: LanguageType;
  setLang: (lang?: LanguageType | undefined) => void;
  kit: number;
  setKit: React.Dispatch<React.SetStateAction<number>>;
}

const Sidebar: React.FC<Props> = ({
  lang,
  setLang,
  kit,
  setKit,
}): ReactElement => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const datestr = year + month + day;
  const hours = date.getHours() - 1 + '00';
  const hour = ('0' + date.getHours()).slice(-2);
  const minute = ('0' + date.getMinutes()).slice(-2);
  const timestr = hours;
  const nowtime = year + '-' + month + '-' + day + '-' + hour + ':' + minute;
  const [change, setchange] = useState(0);
  const [temp, settemp] = useState('');
  const [autoControlStatus, setAutoControlStatus] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [kits, setkits] = useRecoilState(allkitsState);
  const [modal, setmodal] = useState(false);
  const [alert, setalert] = useState(false);

  const url = WEATHER_URL + '/VilageFcstInfoService_2.0/getUltraSrtNcst';

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
    getAllKits(setkits);
  }, [modal]);

  useEffect(() => {
    callWeather();
  }, []);

  useEffect(() => {
    const callAPI = async () => {
      await AutocontrolStatusAPI(kit, setAutoControlStatus);
    };
    kit && callAPI();
  }, [kit]);

  const lottieOps = {
    loop: true,
    autoplay: true,
    animationData: Loading,
    renderSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="flex flex-col w-1/4 justify-center h-[100vh]">
      <div className="bg-slate-800 h-full flex flex-col justify-center items-center relative">
        <p className="text-3xl m-0 text-center mt-5 p-3 font-black">{`${languages.logo[lang]}`}</p>
        {loading ? (
          <Lottie
            options={lottieOps}
            isClickToPauseDisabled
            width={300}
            height={300}
          />
        ) : (
          <div className="flex flex-col px-5 text-center items-center justify-center text-white">
            <div className="flex flex-col bg-slate-900 rounded-3xl py-2 justify-center items-center">
              <p className="text-xl font-normal my-0">
                {languages.weatherlocation[lang]}
              </p>
              <div className="px-10 w-2/3 h-2/3">
                {(change == 0 && <Sunny />) ||
                  (change == 1 && <Rain />) ||
                  (change == 3 && <Snow />) ||
                  (change == 5 && <Cloudy />)}
              </div>
              <p className="text-3xl my-2 mt-[-5px] font-light">{temp}C°</p>
            </div>
            <h3>{languages.langmangementlang[lang]}</h3>
            <Toggle color="blue" defaultValue={lang} handleSelect={setLang}>
              <ToggleItem value="en" text="🇬🇧 English" />
              <ToggleItem value="ko" text="🇰🇷 한국어" />
            </Toggle>
            <h3>{languages.kitmangementlang[lang]}</h3>
            <div className="flex space-x-2 items-stretch justify-center">
              <Button
                text={languages.add[lang]}
                size="md"
                importance="primary"
                handleClick={() => {
                  setmodal(true);
                }}
              />
              <SelectBox
                defaultValue={1}
                handleSelect={(value) => {
                  setKit(value);
                }}
              >
                {kits.map((v) => (
                  <SelectBoxItem
                    key={v.id}
                    value={v.id}
                    text={'KIT ' + String(v.id)}
                  />
                ))}
              </SelectBox>
              {kit !== 1 && (
                <Button
                  text={languages.remove[lang]}
                  size="md"
                  importance="primary"
                  handleClick={async () => {
                    await deleteKits(kit);
                    await setKit(1);
                  }}
                />
              )}
            </div>
            <h3>{languages.autolang[lang]}</h3>
            <div className="space-x-2">
              <Toggle
                color="blue"
                defaultValue={autoControlStatus}
                handleSelect={(value: number) => {
                  AutocontrolAPI(kit, value);
                  if (value == 1) {
                    window.alert(kit + '번 키트 자동 제어 활성화');
                    setAutoControlStatus(1);
                  } else {
                    window.alert(kit + '번 키트 수동 제어 활성화');
                    setAutoControlStatus(0);
                  }
                }}
              >
                <ToggleItem value={1} text="ON" />
                <ToggleItem value={0} text="OFF" />
              </Toggle>
              <Button
                color="blue"
                text={languages.setupalert[lang]}
                size="md"
                marginTop="mt-4"
                importance="primary"
                handleClick={() => {
                  setalert(true);
                }}
              />
            </div>
          </div>
        )}
        {modal && <Modal open={modal} close={setmodal} />}
        {alert && <AlertModal kit={kit} open={alert} close={setalert} />}
      </div>
    </div>
  );
};

export default Sidebar;
setInterval(() => Sidebar, 30000);
