import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { Store } from './store';

import SlotMachine from './SlotMachine';

function App() {
  return (
    <Provider store={Store}>
      <SlotMachine />
    </Provider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
