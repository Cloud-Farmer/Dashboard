import React, { useState } from 'react';
import { Button } from '@tremor/react';
import Alert from '../components/Alert';

const AlertList = () => {
  const [modal, setModal] = useState(false);
  return (
    <>
      <Button
        size="sm"
        importance="primary"
        text="Alert"
        handleClick={() => {
          setModal(true);
        }}
      />
      {/* {modal === true ? <Alert /> : null} */}
    </>
  );
};
export default AlertList;
