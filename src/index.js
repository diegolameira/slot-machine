import React from 'react';
import ReactDOM from 'react-dom';

import SlotMachine from './SlotMachine';

function App() {
  return (
    <div className="App">
      <SlotMachine />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
