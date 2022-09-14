import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Landing from '../Landing/Landing/Landing';

function App() {
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Landing></Landing>}/>
      </Routes>
    </div>
  );
}

export default App;
