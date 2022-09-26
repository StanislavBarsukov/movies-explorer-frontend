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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  return (
    <div className="page">
      <Routes>
        <Route path="/sign-up" element={<Register/>}/>
        <Route path="/sign-in" element={<Login/>}/>
        <Route path="/" element={
            <Main loggedIn={loggedIn}/>
         }/>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/profile" element={
          <ProtectedRoute loggedIn={loggedIn}>
            <Profile/>
          </ProtectedRoute>
          }
        />
        <Route path="/movies" element={
          <ProtectedRoute loggedIn={loggedIn}>
            <Movies/>
          </ProtectedRoute>
          }
        />
        <Route path="/save-movies" element={
          <ProtectedRoute loggedIn={loggedIn}>
            <SavedMovies/>
          </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
