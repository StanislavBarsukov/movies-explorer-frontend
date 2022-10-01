import React from "react";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import * as auth from '../../utils/Auth/Auth';
import './App.css';
import Main from '../Landing/Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {CurrentUserContext} from '../../context/CurrentUserContext';
import apiMovies from '../../utils/ApiMovies/ApiMovies';
import api from "../../utils/Api/Api";

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn ] = React.useState(false);
  const [ isSuccess, setIsSuccess ] = React.useState(false);
  const [currentUser, setCurrentUser ] = React.useState({});
  const [ movies, setIsMovies ] = React.useState([]);
  const [ messageError, setMessageError ] = React.useState('');

  React.useEffect(() => {
    if (loggedIn) {
      apiMovies.getMovies()
        .then((data) => {
          setIsMovies(data)
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      api.getUser()
        .then((user) => {
          setCurrentUser(user.user)
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [loggedIn]);

  const handleTokenCheck = () => {
    const token = localStorage.getItem('token');
    setLoggedIn(true);
    if (token) {
      auth.getContent(token)
        .then(() => {
          setLoggedIn(true);
          navigate("/movies");
        })
        .catch((err) => console.log(err));
    }
  };

  React.useEffect(() => {
    handleTokenCheck()
  }, []);

  const handleRegister = (email, password, name) => {
    auth.register(email, password, name)
      .then((res) => {
        if(res.user) {
          setMessageError('');
          handleLogin(email, password);
          navigate('/movies');
        }
      })
      .catch((err) => {
        if(err === 400) {
          setMessageError('Введены невалидные данные');
        } else if (err === 409) {
          setMessageError('Такой E-mail уже зарегестрирован');
        } else if (err === 500) {
          setMessageError('На сервере произошла ошибка');
        }
        console.log(`Некорректно заполнено одно из полей ${err}`)
      });
  };

  const handleLogin = (email, password) => {
    auth.authorize(email, password)
      .then((res) => {
        setLoggedIn(true);
        navigate('/movies');
        setMessageError('');
        localStorage.setItem('token', res.token);
      })
      .catch((err) => {
        if(err === 400) {
          setMessageError('Введены невалидные данные');
        } else if (err === 401) {
          setMessageError('Ошибка...Проверьте корректность Пароля или E-mail');
        }
        console.log(`Некорректно заполнено одно из полей ${err}`)
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/sign-up" element={
            <Register handleRegister={handleRegister} messageError={messageError}/>
          }/>
          <Route path="/sign-in" element={<Login handleLogin={handleLogin} messageError={messageError}/>
          }/>
          <Route path="/" element={
            <Main loggedIn={loggedIn}/>
          }/>
          <Route path="*" element={<NotFound/>}/>
          <Route path="/profile" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Profile handleLogout={handleLogout}/>
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
