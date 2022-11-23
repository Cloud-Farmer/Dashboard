import React, { ReactElement, useEffect, useRef } from 'react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Button, Flex } from '@tremor/react';
import { allkitsState, newkitState } from '../state/atoms';
import { newKitAPI } from '../api/sensor';

interface props {
  open: boolean;
  close: (value: React.SetStateAction<boolean>) => void;
}

const Modal = (props: props): ReactElement => {
  const { open, close } = props;
  const [idinput, idSetinput] = useState('');
  const [aliasinput, aliasSetinput] = useState('');

  const handleOnClick = async () => {
    await newKitAPI(Number(idinput));
    await close(false);
  };

  return (
    <>
      {open ? (
        <div className="bg-slate-800 bg-opacity-70 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 z-40">
          <div className="bg-slate-900 px-16 py-8 rounded-2xl drop-shadow-xl text-center z-50 flex flex-col">
            <h1>Kit 추가 모달</h1>
            <div className="flex space-x-2 items-center justify-center">
              <label
                form="kitid"
                className="block text-lg font-bold text-white dark:text-white w-1/3"
              >
                KIT ID
              </label>
              <input
                type="number"
                id="kitid"
                onChange={(e) => {
                  idSetinput(e.target.value);
                }}
                className="bg-gray-30 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500
             focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-800 dark:focus:border-blue-500 w-2/3"
                placeholder="Id"
              />
            </div>
            <Flex
              justifyContent="justify-center"
              spaceX="space-x-5"
              marginTop="mt-6"
            >
              <Button text="OK" handleClick={() => handleOnClick()} />
              <Button text="Cancel" handleClick={() => close(false)} />
            </Flex>
          </div>
        </div>
      ) : (
        0
      )}
    </>
  );
};
export default Modal;
