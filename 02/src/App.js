import React from 'react';
import './App.css';
import Species from './species.js'
import { Divider } from '@material-ui/core';

function App() {
  return (
    <div className="App">
        <h1>The Species of Star Wars</h1>
        <Divider />
        <Species count={9}></Species>
    </div>
  );
}

export default App;
