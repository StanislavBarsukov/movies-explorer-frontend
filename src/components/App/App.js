import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Landing from '../Landing/Landing/Landing';
import Register from '../Register/Register';
import Login from '../Login/Login';
function App() {
  return (
    <div className="page">
      <Routes>
        <Route path="sign-up" element={<Register/>}/>
        <Route path="sign-in" element={<Login/>}/>
        <Route path="/" element={<Landing/>}/>
      </Routes>
    </div>
  );
}

export default App;
