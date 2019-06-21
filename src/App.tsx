import React from 'react';
import { HuePicker } from 'react-color';

import config from './config'
import { Webcam } from './components'

import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <main>
        <Webcam imageUrl={config.webcam.imageUrl} />
        <HuePicker />
      </main>
    </div>
  );
}

export default App;
