import React from 'react';

import useWebsocketConnect from '../hooks/useWebsocketConnect.js';
import useWebsocketListener from '../hooks/useWebsocketListener.js';
import useResizeCanvas from '../hooks/useResizeCanvas.js';
import Footer from '../components/Footer.jsx';
import ModalGreeting from '../components/ModalGreeting.jsx';
import Canvas from '../components/Canvas.jsx';
import SettingsBar from '../components/SettingsBar.jsx';
import ToolBar from '../components/ToolBar.jsx';

const Main = () => {
  const [showModalGreeting, setShowModalGreeting] = React.useState(true);

  useWebsocketConnect();
  useWebsocketListener();

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-10 offset-1'>
          <h1>Painter Online</h1>
          <ToolBar />
          <SettingsBar />
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <ModalGreeting showModalGreeting={showModalGreeting} setShowModalGreeting={setShowModalGreeting} />
          <Canvas width={useResizeCanvas().canvasWidth} height={useResizeCanvas().canvasHeight} />
        </div>
      </div>
      <div className='row'>
        <div className='col-12'>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Main;
