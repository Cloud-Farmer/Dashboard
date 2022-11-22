import React, { useState } from 'react';
import { useEffect } from 'react';
import { AutocontrolAPI, AutocontrolStatusAPI } from '../api/sensor';
import { Toggle, ToggleItem } from '@tremor/react';
import { getCookie, setCookie } from '../util/cookie';
import { useLanguage } from '../hooks';
import { languages } from '../util';

type Props = {
  kit: number;
};

const AutoControl: React.FC<Props> = ({ kit }) => {
  const [value, setValue] = useState(0);
  const [lang, setLang] = useLanguage();

  useEffect(() => {
    const callAPI = async () => {
      await AutocontrolStatusAPI(kit);
    };
    console.log(kit);
    kit && callAPI();
  }, [kit]);

  return (
    <div>
      <h3>{languages.autolang[lang]}</h3>
      <Toggle
        color="blue"
        defaultValue={value}
        handleSelect={(value: number) => {
          AutocontrolAPI(kit, value);
          console.log(kit);
          //setCookie(kit, String(setValue(value)));
          (value == 1 && window.alert(kit + '번 키트 자동 제어 활성화')) ||
            (value == 0 && window.alert(kit + '번 키트 수동 제어 활성화'));
        }}
      >
        <ToggleItem value={1} text="On" />
        <ToggleItem value={0} text="Off" />
      </Toggle>
    </div>
  );
};
export default AutoControl;
