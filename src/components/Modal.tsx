import React, { ReactElement, useRef } from 'react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Button, Flex } from '@tremor/react';
import { newkitState } from '../state/atoms';

interface props {
  open: boolean;
  close: (value: React.SetStateAction<boolean>) => void;
}
type FormProps = {
  onSubmit: (form: { id: number; alias: string }) => void;
};

const Modal = (props: props, { onSubmit }: FormProps): ReactElement => {
  const [kits, setkits] = useRecoilState(newkitState);
  const { open, close } = props;
  const [idinput, idSetinput] = useState('');
  const [aliasinput, aliasSetinput] = useState('');

  const handleOnClick = async () => {
    await setkits((prev: any) => {
      return [...prev, { id: idinput, alias: aliasinput }];
    });
    await console.log(kits);
    await close(false);
  };

  return (
    <>
      {open ? (
        <div className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
          <div className="bg-white px-16 py-8 rounded-md text-center">
            <h1>Kit 추가 모달</h1>
            <div>
              <label
                form="kitid"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
             focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Id"
              />
            </div>
            <div>
              <label
                form="alias"
                className="block mb-2 text-md font-la text-gray-900 dark:text-white"
              >
                Alias
              </label>
              <input
                type="text"
                id="alias"
                onChange={(e) => {
                  aliasSetinput(e.target.value);
                }}
                className="bg-gray-30 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500
             focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Alias"
              />
            </div>
            <Flex
              justifyContent="justify-end"
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
