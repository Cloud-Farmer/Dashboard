import React, { ReactElement, useEffect } from 'react';
import { Button, Flex, SelectBox, SelectBoxItem } from '@tremor/react';
import { useState } from 'react';
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
    alertsettingAPI(kit, 'humidity', Number(valueinput));
    close(false);
  };

  return (
    <>
      {open ? (
        <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
          <div className="bg-white px-20 py-8 rounded-md">
            <div>
              <Button text="X" handleClick={() => close(false)} />
            </div>
            <h1>알람 설정</h1>
            <div>
              <SelectBox maxWidth="max-w-xs">
                <SelectBoxItem
                  value={() => {
                    setalertdata('temperature');
                  }}
                  text="온도"
                />
                <SelectBoxItem
                  value={() => {
                    setalertdata('humidity');
                  }}
                  text="습도"
                />
                <SelectBoxItem
                  value={() => {
                    setalertdata('illuminance');
                  }}
                  text="조도"
                />
                <SelectBoxItem
                  value={() => {
                    setalertdata('soilHumidity');
                  }}
                  text="토양 습도"
                />
              </SelectBox>
            </div>
            <div className="mt-5">
              <input
                type="number"
                id="alias"
                onChange={(e) => {
                  valueSetinput(e.target.value);
                }}
                className="bg-gray-30 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500
             focus:border-blue-500 block w-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <Flex>
                <Button
                  marginTop="mt-5"
                  text="OK"
                  handleClick={() => handleOnClick()}
                />
              </Flex>
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
