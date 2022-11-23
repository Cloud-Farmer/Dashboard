import { Button, SelectBox, SelectBoxItem } from '@tremor/react';
import React, { ReactElement, useState } from 'react';
import { alertsettingAPI } from '../api/sensor';

interface props {
  kit: number;
  open: boolean;
  close: (value: React.SetStateAction<boolean>) => void;
}

const AlertModal = (props: props): ReactElement => {
  const { kit, open, close } = props;
  const [valueinput, valueSetinput] = useState('');
  const [alertdata, setalertdata] = useState('');

  const handleOnClick = () => {
    valueSetinput(valueinput);
    // alertsettingAPI(kit, alertdata, Number(valueinput));
    alertsettingAPI(kit, alertdata, Number(valueinput));
    close(false);
  };

  return (
    <>
      {open ? (
        <div className="bg-slate-800 bg-opacity-70 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
          <div className="bg-slate-900 px-10 py-8 rounded-2xl drop-shadow-xl text-center">
            <h1>알람 설정</h1>
            <div className="flex flex-row space-x-1 justify-start items-center">
              <p className="text-md font-bold w-1/3">감지 센서</p>
              <div className="w-2/3">
                <SelectBox>
                  <SelectBoxItem
                    value={() => {
                      setalertdata('temperature');
                    }}
                    text="온도 센서"
                  />
                  <SelectBoxItem
                    value={() => {
                      setalertdata('humidity');
                    }}
                    text="습도 센서"
                  />
                  <SelectBoxItem
                    value={() => {
                      setalertdata('illuminance');
                    }}
                    text="조도 센서"
                  />
                  <SelectBoxItem
                    value={() => {
                      setalertdata('soilhumidity');
                    }}
                    text="토양 습도 센서"
                  />
                </SelectBox>
              </div>
            </div>
            <div className="flex flex-row space-x-1 justify-start items-center">
              <p className="text-md font-bold w-1/3">감지 값</p>
              <div>
                <input
                  type="number"
                  id="alias"
                  onChange={(e) => {
                    valueSetinput(e.target.value);
                  }}
                  className="bg-gray-30 border w-full border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500
             focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>
            <div className="mt-5 space-x-2">
              <Button text="OK" handleClick={() => handleOnClick()} />
              <Button text="취소" handleClick={() => close(false)} />
            </div>
          </div>
        </div>
      ) : (
        0
      )}
    </>
  );
};
export default AlertModal;
