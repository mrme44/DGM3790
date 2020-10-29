import React from 'react';
import './App.css';
import Nav from './nav.js'
import Species from './species.js'

function App() {
  return (
    <div className="App">
        <Nav/>
        <Species count={9}></Species>
    </div>
  );
}

export default App;
