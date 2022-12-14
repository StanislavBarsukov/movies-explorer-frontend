import React from 'react';
import apiMovies from '../../utils/ApiMovies/ApiMovies';
import api from '../../utils/Api/Api';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import  { Text_Error, TimeFilm, Code } from  '../../utils/const/const';
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
import CheckRoute from '../CheckRoute/CheckRoute';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [ loggedIn, setLoggedIn ] = React.useState(false);
  const [ isSuccess, setIsSuccess ] = React.useState(false);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ checked, setChecked ] = React.useState(false);
  const [ checkedSave, setCheckedSave ] = React.useState(false);

  const [ currentUser, setCurrentUser ] = React.useState({});
  const [ movies, setMovies ] = React.useState([]);
  const [ moviesSave, setMoviesSave ] = React.useState([]);
  const [ moviesSearch, setMoviesSearch] = React.useState([]);
  const [ moviesSaveShort, setMoviesSaveShort ] = React.useState([]);

  const [ messageErrorLogin, setMessageErrorLogin ] = React.useState('');
  const [ messageErrorRegister, setMessageErrorRegister ] = React.useState('');
  const [ messageErrorSearch, setMessageErrorSearch ] = React.useState('');
  const [ messageErrorSearchSave, setMessageErrorSearchSave ] = React.useState('');
  const [ messageErrorProfile, setMessageErrorProfile ] = React.useState('');

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  React.useEffect(() => {
    const checkbox = localStorage.getItem('checkbox');
    setChecked(checkbox === 'true')
      if (localStorage.getItem('search')) {
        handleMovie(JSON.parse(localStorage.getItem('search')));
      }

  }, [checked]);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (loggedIn) {
      api.getUser(token)
        .then((user) => {
          setCurrentUser(user.user);
        })
        .catch((err) => {
          console.log(`????????????: ${err}`);
        });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      setMessageErrorSearchSave('')
      const moviesSaves = localStorage.getItem('moviesSave');
      if (!moviesSaves?.movie) {
        api.getMoviesSave()
          .then((data) => {
            localStorage.setItem('moviesSave', JSON.stringify(data));
            setMoviesSave(data.movie.reverse());
            if (checkedSave) {
              setMoviesSaveShort(handleShortMovie(data.movie))
            }
          })
          .catch((err) => {
            console.log(`????????????: ${err}`);
          });
      } else {
        setMoviesSave(JSON.parse(moviesSaves));
      }
    }
  }, [location, checkedSave, loggedIn]);

  const handleTokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.getContent(token)
        .then(() => {
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(`????????????: ${err}`);
          setLoggedIn(false);
          handleLogout();
        })
    }
    if (!token) {
      handleLogout();
    }
  };

  const handleRegister = (email, password, name) => {
    setMessageErrorProfile('')
    auth.register(email, password, name)
      .then((res) => {
        if(res.user) {
          handleLogin(email, password);
          setMessageErrorRegister(Text_Error.SuccessReg);
          navigate('/movies');
          setTimeout(() => {
            cleanError()
          }, 2000);
        }
        setIsSuccess(true);
      })
      .catch((err) => {
        if(err === Code.BadRequest) {
          setMessageErrorRegister(Text_Error.BadRequest);
        } else if (err === Code.Conflicting) {
          setMessageErrorRegister(Text_Error.Conflicting);
        } else if (err === Code.Server) {
          setMessageErrorRegister(Text_Error.ServerError);
        }
        console.log(`?????????????????????? ?????????????????? ???????? ???? ?????????? ${err}`);
        setIsSuccess(false);
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
        if(err === Code.BadRequest) {
          setMessageErrorLogin(Text_Error.BadRequest);
        } else if (err === Code.Unauthorized) {
          setMessageErrorLogin(Text_Error.Unauthorized);
        }
        console.log(`?????????????????????? ?????????????????? ???????? ???? ?????????? ${err}`);
      })
  };

  const handleUpdateUser = ({ email, name }) => {
     return api.updateUser(email, name)
      .then((res) => {
        setCurrentUser(res.user);
        setMessageErrorProfile(Text_Error.UpdateLog);
        setTimeout(() => {
          cleanError()
        }, 2000);
        setIsSuccess(true);
      })
      .catch((err) => {
        if(err === Code.BadRequest) {
          setMessageErrorProfile(Text_Error.BadRequest);
        } else if (err === Code.Conflicting) {
          setMessageErrorProfile(Text_Error.Unauthorized_Email);
        } else if (err === Code.Server) {
          setMessageErrorProfile(Text_Error.ServerError);
        }
        console.log(`?????????????????????? ?????????????????? ???????? ???? ?????????? ${err}`);
        setIsSuccess(false);
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
          handleFoundMovies(name, data);
        })
        .catch((err) => {
          console.log(`????????????: ${err}`);
          setMessageErrorSearch(Text_Error.Search_Error);
          setIsLoading(false);
          setTimeout(() => {
            cleanError()
          }, 2000);
        });
    } else {
      setMovies(JSON.parse(movie));
      handleFoundMovies(name, JSON.parse(movie));
    }
  };

  const handleSaveMovie = (movie) => {
      api.saveMovie(movie)
        .then((res)=> {
          const newMovieSave = [res.movie, ...moviesSave]
          console.log(newMovieSave)
          localStorage.setItem('moviesSave', JSON.stringify(newMovieSave));
          setMoviesSave(newMovieSave);
        })
        .catch((err)=>{
          if(err === Code.Unauthorized) {
            handleLogout()
          }
          console.log(`????????????: ${err}`);
        })
  };

  const handleDeleteMovie = (movie) => {
    api.deleteMovie(movie._id)
      .then(() => {
        const newMoviesList = moviesSave.filter((i) => i.movieId !== movie.movieId)
        setMoviesSave(newMoviesList)
      })
      .catch((err) => {
        if(err === Code.Unauthorized) {
          handleLogout()
        }
        console.log(`????????????: ${err}`);
      })
  };

  const handleFoundMovies = (name, moviesSearch) => {
    if( null !== name ) {
      let movieResult = moviesSearch.filter((m) => {
        return m.nameRU.toLowerCase().includes(name.toLowerCase()) ||
          m.nameEN.toLowerCase().includes(name.toLowerCase())
      });
      if (movieResult.length === 0 && name) {
        setMessageErrorSearch(Text_Error.Search);
        setMoviesSearch([]);
      } else {
        setMoviesSearch(movieResult);
        cleanError();
        if (checked) {
          setMoviesSearch(handleShortMovie(movieResult));
        }
      }
    }
  };

  const handleFoundMoviesSave = (name) => {
    const movieResultSave = moviesSave.filter((m) => {
      return m.nameRU.toLowerCase().includes(name.toLowerCase()) ||
        m.nameEN.toLowerCase().includes(name.toLowerCase())
    })
    if (movieResultSave.length === 0 && name) {
      setMessageErrorSearchSave(Text_Error.SearchSave);
      setMoviesSave([]);
    } else {
      setMoviesSave(movieResultSave);
      cleanError();
    }
  };

  const handleShortMovie = (movies) => {
    return movies.filter((m)=> m.duration <= TimeFilm.FortyMin);
  };

  const checkToggle = () => {
    if (location.pathname === '/movies') {
      localStorage.setItem('checkbox', !checked);
      setChecked(!checked);
    }
    if (location.pathname === '/save-movies') {
      setCheckedSave(!checkedSave);
    }
  };

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
    setMoviesSearch([]);
    navigate('/');
    cleanError();
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/sign-up" element={
            loggedIn ? <CheckRoute/> :
            <Register handleRegister={handleRegister} message={messageErrorRegister}/>
          }/>
          <Route path="/sign-in" element={
            loggedIn ? <CheckRoute/> :
            <Login handleLogin={handleLogin} message={messageErrorLogin}/>
          }/>
          <Route path="/" element={
            <Main loggedIn={loggedIn}/>
          }/>
          <Route path="/profile" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Profile
                isSuccess={isSuccess}
                message={messageErrorProfile}
                handleLogout={handleLogout}
                handleUpdateUser={handleUpdateUser}
              />
            </ProtectedRoute>
          }
          />
          <Route path="/movies" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Movies
                loading={isLoading}
                checked={checked}
                moviesSave={moviesSave}
                moviesAll={moviesSearch}
                message={messageErrorSearch}
                onSave={handleSaveMovie}
                onSearch={handleMovie}
                onDelete={handleDeleteMovie}
                checkToggle={checkToggle}
                handleShortMovie={handleShortMovie}
              />
            </ProtectedRoute>
          }
          />
          <Route path="/save-movies" element={
            <ProtectedRoute loggedIn={loggedIn}>
              <SavedMovies
                checkedSave={checkedSave}
                movies={moviesSave}
                moviesSave={moviesSave}
                moviesSaveShort={moviesSaveShort}
                messageSave={messageErrorSearchSave}
                checkToggle={checkToggle}
                onSave={handleSaveMovie}
                onDelete={handleDeleteMovie}
                onSearchSave={handleFoundMoviesSave}
              />
            </ProtectedRoute>
          }
          />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
