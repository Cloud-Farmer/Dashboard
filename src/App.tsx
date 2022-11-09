import react from 'react';
import '@tremor/react/dist/esm/tremor.css';
import 'react-toastify/dist/ReactToastify.css';
import Main from './pages/Main/Main';
import Main2 from './pages/Main/Main2';

function App() {
  return (
    <div style={{ margin: '45px' }}>
      <Main />
      {/* <Main2 /> */}
    </div>
  );
}

export default App;
