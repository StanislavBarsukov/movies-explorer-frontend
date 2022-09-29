import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import './App.css';
import Main from '../Landing/Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {CurrentUserContext} from "../../context/CurrentUserContext";
import apiMovies from "../../utils/ApiMovies/ApiMovies";

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState({});
  const [ movies, setIsMovies] = React.useState([]);
  React.useEffect(() => {
    apiMovies.getMovies()
      .then((data) => {
        setIsMovies(data)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });

  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/sign-up" element={<Register />}/>
          <Route path="/sign-in" element={<Login />}/>
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
              <Movies movies={movies}/>
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
    </CurrentUserContext.Provider>
  )
}

export default App;
