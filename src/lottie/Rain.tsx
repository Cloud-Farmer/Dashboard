import Lottie from 'react-lottie';
import Rain from '../lottie/4803-weather-storm.json';

export default (): any => {
  const rain = {
    loop: true,
    autoplay: true,
    animationData: Rain,
    renderSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <>
      <Lottie options={rain} isClickToPauseDisabled />
    </>
  );
};
