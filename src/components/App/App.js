import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import '../Header/Header';
import Header from '../Header/Header';
function App() {
  return (
    <div className="page">
      <Routes>
        <Route path="*" element={<Header/>}/>
      </Routes>
    </div>
  );
}

export default App;
