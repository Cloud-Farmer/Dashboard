import { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import { toast, ToastContainer } from 'react-toastify';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  alertAPI,
  controlSensorStatusAPI,
  getAllKits,
  getSensorAPI,
} from '../api/sensor';
import LoadingAnimation from '../assets/107420-no-data-loader.json';
import Alert from '../components/Alert';
import Loading from '../components/Loading';
import { useLanguage } from '../hooks';
import {
  alertDataState,
  allkitsState,
  controlState,
  dateFrequencyState,
  humDataState,
  illDataState,
  soilDataState,
  tempDataState,
} from '../state/atoms';
import { setCookie } from '../util/cookie';
import APIChart from './APIChart';
import Control from './Control';
import Weather from './SideBar';
import { GrRefresh } from 'react-icons/gr';
import { Button } from '@tremor/react';
import { languages } from '@src/util';

const Main = () => {
  const [lang, setLang] = useLanguage();
  const [loading, setLoading] = useState<boolean>();
  const [kit, setKit] = useState<any>(1);
  const setControlStatus = useSetRecoilState(controlState);
  const setTempData = useSetRecoilState(tempDataState);
  const setHumData = useSetRecoilState(humDataState);
  const setIllData = useSetRecoilState(illDataState);
  const setSoilData = useSetRecoilState(soilDataState);
  const setAlertData = useSetRecoilState(alertDataState);
  const setKits = useSetRecoilState(allkitsState);
  const days = useRecoilValue(dateFrequencyState);
  const [updatedTime, setUpdatedTime] = useState(new Date());

  const callAPIs = async () => {
    await setLoading(true);
    await controlSensorStatusAPI(kit, 'window', setControlStatus);
    await controlSensorStatusAPI(kit, 'pump', setControlStatus);
    await controlSensorStatusAPI(kit, 'fan', setControlStatus);
    await controlSensorStatusAPI(kit, 'led', setControlStatus);
    await getSensorAPI(kit, 'temperature', days, setTempData, lang);
    await getSensorAPI(kit, 'humidity', days, setHumData, lang);
    await getSensorAPI(kit, 'illuminance', days, setIllData, lang);
    await getSensorAPI(kit, 'soilHumidity', days, setSoilData, lang);
    await alertAPI(kit, 0, 12, setAlertData);
    await getAllKits(setKits);
    await setLoading(false);
    (kit === 1 || kit === 2) &&
      (await toast.success(languages.datafetched[lang]));
  };

  useEffect(() => {
    console.log(lang + kit + days + updatedTime);
    kit && callAPIs();
  }, [lang, kit, days, updatedTime]);

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
              <div className="items-center flex ml-5 space-x-2 mt-2">
                <p className="text-sm font-extrabold text-gray-200">
                  {`${updatedTime.toLocaleString('ko-kr')}
                   ${languages.updated[lang]}`}
                </p>
                <Button
                  text="Refresh"
                  size="xs"
                  icon={GrRefresh}
                  handleClick={() => setUpdatedTime(new Date())}
                />
              </div>
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
