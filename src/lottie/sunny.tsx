import React from 'react';
import Lottie from 'react-lottie';
import Sunny from '../lottie/4804-weather-sunny.json';

export default (): any => {
  const sunny = {
    loop: true,
    autoplay: true,
    animationData: Sunny,
    renderSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <>
      <Lottie options={sunny} isClickToPauseDisabled />
    </>
  );
};
