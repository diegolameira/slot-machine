import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
