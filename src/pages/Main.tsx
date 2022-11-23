import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { alertAPI, controlSensorStatusAPI, getSensorAPI } from '../api/sensor';
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
} from '../state/atoms';
import { setCookie } from '../util/cookie';
import APIChart from './APIChart';
import Control from './Control';
import Weather from './SideBar';

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
    await setLoading(false);
  };

  useEffect(() => {
    setCookie('kitId', String(kit));
    kit && callAPIs();
  }, [lang, kit, day]);

  return (
    <div className="h-full w-full flex flex-row text-white bg-slate-800 m-0 p-0">
      <Weather lang={lang} setLang={setLang} kit={kit} setKit={setKit} />
      {!loading ? (
        <div className="h-full w-3/4 p-0 bg-slate-800 text-white space-y-2 overflow-y-scroll m-0">
          <APIChart />
          <div className="flex flex-row space-x-2 px-5">
            <Control kit={kit} />
            <Alert />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default Main;
