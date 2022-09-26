import React from "react";
import {Routes, Route} from "react-router-dom";
import './App.css';
import Main from '../Landing/Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {
  return (
    <div className="page">
      <Routes>
        <Route path="/sign-up" element={<Register/>}/>
        <Route path="/sign-in" element={<Login/>}/>
        <Route path="/" element={<Main/>}/>
        <Route path="/no" element={<NotFound/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/save-movies" element={<SavedMovies/>}/>
      </Routes>
    </div>
  );
}

export default App;
