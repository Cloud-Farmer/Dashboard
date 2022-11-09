import React from 'react';
import Lottie from 'react-lottie';
import Cloudy from '../lottie/4806-weather-windy.json';

export default (): any => {
  const cloudy = {
    loop: true,
    autoplay: true,
    animationData: Cloudy,
    renderSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <>
      <Lottie options={cloudy} isClickToPauseDisabled />
    </>
  );
};
