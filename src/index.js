import React from 'react';
import ReactDOM from 'react-dom';
import Uploader from './Uploader';

import './styles.scss';

function App() {
  return (
    <div className="App">
      <Uploader />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
