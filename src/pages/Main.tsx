import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  alertAPI,
  controlSensorStatusAPI,
  getAllKits,
  getSensorAPI,
} from '../api/sensor';
import Alert from '../components/Alert';
import Loading from '../components/Loading';
import { useLanguage } from '../hooks';
import {
  alertDataState,
  controlState,
  dateFrequencyState,
  humDataState,
  illDataState,
  soilDataState,
  tempDataState,
  allkitsState,
} from '../state/atoms';
import { setCookie } from '../util/cookie';
import APIChart from './APIChart';
import Control from './Control';
import Weather from './SideBar';
import { ToastContainer } from 'react-toastify';
import Lottie from 'react-lottie';
import LoadingAnimation from '../assets/107420-no-data-loader.json';

const Main = () => {
  const [lang, setLang] = useLanguage();
  const [loading, setLoading] = useState<boolean>(true);
  const [kit, setKit] = useState<any>(1);
  const setControlStatus = useSetRecoilState(controlState);
  const setTempData = useSetRecoilState(tempDataState);
  const setHumData = useSetRecoilState(humDataState);
  const setIllData = useSetRecoilState(illDataState);
  const setSoilData = useSetRecoilState(soilDataState);
  const setAlertData = useSetRecoilState(alertDataState);
  const setKits = useSetRecoilState(allkitsState);
  const day = useRecoilValue(dateFrequencyState);

  const callAPIs = async () => {
    await controlSensorStatusAPI(kit, 'window', setControlStatus);
    await controlSensorStatusAPI(kit, 'pump', setControlStatus);
    await controlSensorStatusAPI(kit, 'fan', setControlStatus);
    await controlSensorStatusAPI(kit, 'led', setControlStatus);
    await getSensorAPI(kit, 'temperature', day, setTempData, lang);
    await getSensorAPI(kit, 'humidity', day, setHumData, lang);
    await getSensorAPI(kit, 'illuminance', day, setIllData, lang);
    await getSensorAPI(kit, 'soilHumidity', day, setSoilData, lang);
    await alertAPI(kit, 0, 12, setAlertData);
    await getAllKits(setKits);
    await setLoading(false);
  };

  useEffect(() => {
    setCookie('kitId', String(kit));
    kit && callAPIs();
  }, [lang, kit, day]);

  const option = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation,
    renderSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <>
      <div className="h-full w-full flex flex-row text-white bg-slate-800 m-0 p-0">
        <Weather lang={lang} setLang={setLang} kit={kit} setKit={setKit} />
        {!loading ? (
          kit === 1 || kit === 2 ? (
            <div className="h-full w-3/4 p-0 bg-slate-800 text-white space-y-2 overflow-y-scroll m-0">
              <APIChart />
              <div className="flex flex-row space-x-2 px-5">
                <Control kit={kit} />
                <Alert />
              </div>
            </div>
          ) : (
            <Lottie options={option} isClickToPauseDisabled />
          )
        ) : (
          <Loading />
        )}
      </div>
      <ToastContainer theme="dark" />
    </>
  );
};
export default Main;
