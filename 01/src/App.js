import React from 'react';
import './App.css';
import Species from './species.js'

function App() {
  return (
    <div className="App">
        <h1>The Species of Star Wars</h1>
      <Species count={10}></Species>
    </div>
  );
}

export default App;
