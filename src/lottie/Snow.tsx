import React from 'react';
import Lottie from 'react-lottie';
import Snow from '../lottie/4793-weather-snow.json';

export default (): any => {
  const snow = {
    loop: true,
    autoplay: true,
    animationData: Snow,
    renderSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <>
      <Lottie options={snow} isClickToPauseDisabled />
    </>
  );
};
