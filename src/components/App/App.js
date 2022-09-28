import React from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
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

  const [ loggedIn, setLoggedIn ] = React.useState(false);
  const [ isSuccess, setIsSuccess ] = React.useState(false);

  const [ currentUser, setCurrentUser ] = React.useState({});

  const [ movies, setMovies ] = React.useState([]);
  const [ moviesSave, setMoviesSave ] = React.useState([]);
  const [ moviesSearch, setMoviesSearch] = React.useState([]);
  const [ moviesSearchSave, setMoviesSearchSave] = React.useState([]);

  const [ messageErrorLogin, setMessageErrorLogin ] = React.useState('');
  const [ messageErrorRegister, setMessageErrorRegister ] = React.useState('');
  const [ messageErrorSearch, setMessageErrorSearch ] = React.useState('');
  const [ messageErrorProfile, setMessageErrorProfile ] = React.useState('');

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (loggedIn) {
      api.getUser(token)
        .then((user) => {
          setCurrentUser(user.user);
          //navigate('/movies');
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [loggedIn]);

  const handleRegister = (email, password, name) => {
    auth.register(email, password, name)
      .then((res) => {
        if(res.user) {
          handleLogin(email, password);
          navigate('/movies');
        }
      })
      .catch((err) => {
        if(err === 400) {
          setMessageErrorRegister('Введены невалидные данные');
        } else if (err === 409) {
          setMessageErrorRegister('Такой E-mail уже зарегестрирован');
        } else if (err === 500) {
          setMessageErrorRegister('На сервере произошла ошибка');
        }
        console.log(`Некорректно заполнено одно из полей ${err}`)
      })
  };

  const handleLogin = (email, password) => {
    auth.authorize(email, password)
      .then((res) => {
        setLoggedIn(true);
        navigate('/movies');
        localStorage.setItem('token', res.token);
      })
      .catch((err) => {
        if(err === 400) {
          setMessageErrorLogin('Введены невалидные данные');
        } else if (err === 401) {
          setMessageErrorLogin('Ошибка...Проверьте корректность Пароля или E-mail');
        }
        console.log(`Некорректно заполнено одно из полей ${err}`);
      })
  };

  const handleTokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.getContent(token)
        .then(() => {
          setLoggedIn(true);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUpdateUser = ({ email, name }) => {
    api.updateUser(email, name)
      .then((res) => {
        setCurrentUser(res.user);
        setIsSuccess(true)

      })
      .catch((err) => {
        if(err === 400) {
          setMessageErrorProfile('Введены невалидные данные');
        } else if (err === 409) {
          setMessageErrorProfile('Такой E-mail уже зарегестрирован');
        } else if (err === 500) {
          setMessageErrorProfile('На сервере произошла ошибка');
        }
        console.log(`Некорректно заполнено одно из полей ${err}`)
        setIsSuccess(false)
      })
  };

  const  handleSaveMovie = (movie) => {
    const token = localStorage.getItem('token');
      api.saveMovie(movie, token)
        .then((res)=> {
          localStorage.setItem('moviesSave', JSON.stringify([...moviesSave, res]));
          setMoviesSave([...moviesSave, res]);
          setMoviesSearchSave([...moviesSave, res]);
        })
        .catch((err)=>{
          console.log(`Некорректно заполнено одно из полей ${err}`);
        })
  };

  const handleMovieSearch = (name) => {
    setIsSuccess(true);
    const movieResult = movies.filter((m) =>
      m.nameRU.toLowerCase().includes(name.toLowerCase())
    );
    setIsSuccess(false);
    if (movieResult.length === 0) {
      setMessageErrorSearch('К сожалению ничего не найдено');
      setMovies([]);
    } else {
      setMovies(movieResult);
      cleanError();
    }
  };

  const cleanError = () => {
    setMessageErrorLogin('');
    setMessageErrorRegister('');
    setMessageErrorSearch('');
  };

  const handleDeleteMovie =(movie) => {
    const savedMovie = moviesSave.movie.find(
      (item) => item.movieId === movie.movieId
    )
    api.deleteMovie(savedMovie._id)
      .then(() => {
        const newMoviesList = moviesSave.filter(
          (item) => item.id !== savedMovie.id
        )
        setMoviesSave(newMoviesList)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        //setTimeout(() => setIsLoading(false), 1000)
      })
  };

  const sortMovies = (movies)=> {
     movies.filter((m) => m.duration <= 40);
  };

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
    cleanError();
    navigate('/');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/sign-up" element={
            <Register handleRegister={handleRegister} message={messageErrorRegister} loggedIn={!loggedIn}/>
          }/>
          <Route path="/sign-in" element={<Login handleLogin={handleLogin} message={messageErrorLogin} loggedIn={!loggedIn}/>
          }/>
          <Route path="/" element={
            <Main loggedIn={loggedIn}/>
          }/>
          <Route path="*" element={<NotFound/>}/>
          <Route path="/profile" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Profile
                message={messageErrorProfile}
                handleUpdateUser={handleUpdateUser}
                handleLogout={handleLogout}
                isSuccess={isSuccess}
              />
            </ProtectedRoute>
          }
          />
          <Route path="/movies" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Movies
                movies={movies}
                message={messageErrorSearch}
                onSearch={handleMovieSearch}
                onSave={handleSaveMovie}
                moviesSave={moviesSave}
                onDelete={handleDeleteMovie}
                onShort={sortMovies}
              />
            </ProtectedRoute>
          }
          />
          <Route path="/save-movies" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <SavedMovies
                moviesSave={moviesSave}
                message={messageErrorSearch}
                onSearch={handleMovieSearch}
                onSave={handleSaveMovie}
                onDelete={handleDeleteMovie}
              />
            </ProtectedRoute>
          }
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
