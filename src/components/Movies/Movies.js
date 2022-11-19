import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import More from '../More/More';
import Preloader from '../Preloader/Preloader';
import { WindowsSize, AmountFilm } from '../../utils/const/const';

function Movies({
 loading, checked, message,
 onSave, moviesSave, moviesAll,
 onSearch, onDelete, checkToggle }) {

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  const [ amount, setAmount ] = React.useState(() => {
    const windowWidth = window.innerWidth;
    console.log(windowWidth)
      if (windowWidth >= WindowsSize.MaxSize) {
        return AmountFilm.L
      } else if (windowWidth >= WindowsSize.MiddleSize) {
        return AmountFilm.L
      } else  {
        return AmountFilm.S
      }
  });

  const [ count, setCount ] = React.useState(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= WindowsSize.MaxSize) {
      return AmountFilm.L
    } else if (windowWidth >= WindowsSize.MiddleSize) {
      return AmountFilm.L
    } else  {
      return AmountFilm.S
    }
  });

  const handleResize = () => {
    const windowWidth = window.innerWidth;
      if (windowWidth >= WindowsSize.MaxSize) {
          return setCount(AmountFilm.L)
        } else if (windowWidth >= WindowsSize.MiddleSize) {
          return setCount(AmountFilm.L)
        } else  {
          return setCount(AmountFilm.S)
        }
  };

  const renderMovies = moviesAll.slice(0, amount);

  const addMore = () => {
    setAmount(m => m + count)
    console.log(count)
  }
  console.log(message)
  return (
    <main>
      <Header/>
      <SearchForm message={message} checked={checked} onSearch={onSearch} checkToggle={checkToggle}/>
      { loading ? <Preloader/> :
        <MoviesCardList
          message={message}
          onSave={onSave}
          loading={loading}
          onDelete={onDelete}
          moviesSave={moviesSave}
          moviesAll={ checked ? moviesAll : renderMovies}
        />
      }
      { !loading && (
        <More
          onClick={addMore}
          movies={moviesAll}
          renderMovies={renderMovies}/>)}
      <Footer/>
    </main>
  );
}

export default Movies;
