import React from 'react';
import './App.css';
import Beziar from "./Components/beziar";
import SvgCanvas from "./Components/svgCanvas/svgCanvas";

function App() {
  return (
    <div className="App">
        <SvgCanvas/>
        <Beziar/>
    </div>
  );
}

export default App;
