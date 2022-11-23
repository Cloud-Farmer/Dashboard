import Lottie from 'react-lottie';
import LoadingAnimation from '../assets/loading.json';

const option = {
  loop: true,
  autoplay: true,
  animationData: LoadingAnimation,
  renderSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const Loading = () => <Lottie options={option} isClickToPauseDisabled />;

export default Loading;
