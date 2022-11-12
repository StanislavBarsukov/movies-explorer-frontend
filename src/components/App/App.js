import React from "react";
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom';
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
import { CurrentUserContext } from '../../context/CurrentUserContext';
import apiMovies from '../../utils/ApiMovies/ApiMovies';
import api from "../../utils/Api/Api";


function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [ loggedIn, setLoggedIn ] = React.useState(false);
  const [ isSuccess, setIsSuccess ] = React.useState(false);
  const [ isLoading, setIsLoading ] = React.useState(false);

  const [ currentUser, setCurrentUser ] = React.useState({});
  const [ movies, setMovies ] = React.useState([]);
  const [ moviesSave, setMoviesSave ] = React.useState([]);
  const [ moviesSearch, setMoviesSearch] = React.useState([]);

  const [ messageErrorLogin, setMessageErrorLogin ] = React.useState('');
  const [ messageErrorRegister, setMessageErrorRegister ] = React.useState('');
  const [ messageErrorSearch, setMessageErrorSearch ] = React.useState('');
  const [ messageErrorSearchSave, setMessageErrorSearchSave ] = React.useState('');
  const [ messageErrorProfile, setMessageErrorProfile ] = React.useState('');

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  React.useEffect(() => {
    if (localStorage.getItem('search')) {
      handleMovie(JSON.parse(localStorage.getItem('search')))
    }
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (loggedIn) {
      api.getUser(token)
        .then((user) => {
          setCurrentUser(user.user);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    const moviesSaves = localStorage.getItem('moviesSave');
    if (location.pathname === '/save-movies') {
        if (!moviesSaves?.movie) {
          api.getMoviesSave()
            .then((data) => {
              localStorage.setItem('moviesSave', JSON.stringify(data));
              setMoviesSave(data.movie.reverse());
            })
            .catch((err) => {
              console.log(`Ошибка: ${err}`);
            });
        } else {
          setMoviesSave(JSON.parse(moviesSaves));
        }
      }
  }, [location]);

  const handleFoundMoviesSave = (name) => {
      const movieResultSave = moviesSave.filter((m) => {
        return m.nameRU.toLowerCase().includes(name.toLowerCase()) ||
          m.nameEN.toLowerCase().includes(name.toLowerCase())
      })
      if (movieResultSave.length === 0 && name) {
        setMessageErrorSearchSave('К сожалению ничего не найдено');
        setMoviesSave([]);
      } else {
        setMoviesSave(movieResultSave);
      }
  };

  const handleRegister = (email, password, name) => {
    setMessageErrorProfile('')
    auth.register(email, password, name)
      .then((res) => {
        if(res.user) {
          handleLogin(email, password);
          setMessageErrorRegister(' Вы успешно прошли регестрацию !')
          navigate('/movies');
          setTimeout(() => {
            cleanError()
          }, 2000);
        }
        setIsSuccess(true)
      })
      .catch((err) => {
        if(err === 400) {
          setMessageErrorRegister('Введены невалидные данные');
        } else if (err === 409) {
          setMessageErrorRegister('Такой E-mail уже зарегестрирован');
        } else if (err === 500) {
          setMessageErrorRegister('На сервере произошла ошибка');
        }
        console.log(`Некорректно заполнено одно из полей ${err}`);
        setIsSuccess(false)
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
          navigate(location.pathname)
        })
        .catch((err) => console.log(err));
    }
  };

  const handleUpdateUser = ({ email, name }) => {
     return api.updateUser(email, name)
      .then((res) => {
        setCurrentUser(res.user);
        setMessageErrorProfile('Вы успешно изменили данные !')
        setTimeout(() => {
          cleanError()
        }, 2000);
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
      api.saveMovie(movie)
        .then((res)=> {
          const newMovieSave = [res.movie, ...moviesSave]
          console.log(newMovieSave)
          localStorage.setItem('moviesSave', JSON.stringify(newMovieSave));
          setMoviesSave(newMovieSave);
        })
        .catch((err)=>{
          console.log(`Некорректно заполнено одно из полей ${err}`);
        })
  };

  const handleDeleteMovie = (movie) => {
    api.deleteMovie(movie._id)
      .then(() => {
        const newMoviesList = moviesSave.filter((i) => i.movieId !== movie.movieId)
        setMoviesSave(newMoviesList)
      })
      .catch((err) => {
        console.log(err)
      })
  };

  const handleMovie = (name) => {
    const movie = localStorage.getItem('movies');
    if (!movie) {
      setIsLoading(true);
      apiMovies.getMovies()
        .then((data) => {
          setIsLoading(false);
          localStorage.setItem('movies', JSON.stringify(data));
          setMovies(data);
          handleFoundMovies(name, data)
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
          setMessageErrorSearch('Что-то пошло не так. Попробуйте ввести другое название или попробуйте позже');
          setIsLoading(false);
          setTimeout(() => {
            cleanError()
          }, 2000);
        });
    } else {
      setMovies(JSON.parse(movie));
      handleFoundMovies(name, JSON.parse(movie))
    }
  };

  const handleFoundMovies = (name, moviesSearch) => {
    if( null !== name ) {
      console.log(moviesSearch)
      const movieResult = moviesSearch.filter((m) => {
        return m.nameRU.toLowerCase().includes(name.toLowerCase()) ||
          m.nameEN.toLowerCase().includes(name.toLowerCase())
      })
      if (movieResult.length === 0 && name) {
        setMessageErrorSearch('К сожалению ничего не найдено');
        setMoviesSearch([]);
        setTimeout(() => {
          cleanError()
        }, 2000);
      } else {
        setMoviesSearch(movieResult);
        cleanError();
      }
    }
  }

  const cleanError = () => {
    setMessageErrorLogin('');
    setMessageErrorRegister('');
    setMessageErrorSearch('');
    setMessageErrorSearchSave('');
    setMessageErrorProfile('');
  };

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
    setMoviesSave([]);
    setMovies([]);
    setMoviesSearch([])
    cleanError();
    navigate('/');
  };
  const sortMovies = (movies)=> {
    movies.filter((m) => m.duration <= 40);
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
                loading={isLoading}
                moviesAll={moviesSearch}
                message={messageErrorSearch}
                onSearch={handleMovie}
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
                movies={moviesSave}
                moviesSave={moviesSave}
                message={messageErrorSearchSave}
                onSearchSave={handleFoundMoviesSave}
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
