import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import More from '../More/More';
import Preloader from '../Preloader/Preloader';

function Movies({
 loading, checked, message,
 onSave, moviesSave, moviesAll,
 onSearch, onDelete, checkToggle }) {

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  const [ amount, setAmount ] = React.useState(() => {
    const windowWidth = window.innerWidth;
      if (windowWidth >= 1020) {
        return 12
      } else if (windowWidth >= 760) {
        return 8
      } else  {
        return 5
      }
  });

  const [ count, setCount ] = React.useState(() => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1020) {
      return 12
    } else if (windowWidth >= 760) {
      return 8
    } else  {
      return 5
    }
  });

  const handleResize = () => {
    const windowWidth = window.innerWidth;
      if (windowWidth >= 1020) {
          return setCount(12)
        } else if (windowWidth >= 760) {
          return setCount(8)
        } else  {
          return setCount(5)
        }
  };

  const renderMovies = moviesAll.slice(0, amount);

  const addMore = () => {
    setAmount(m => m + count)
  }

  return (
    <main>
      <Header/>
      <SearchForm message={message} checked={checked} onSearch={onSearch} checkToggle={checkToggle}/>
      { loading ? <Preloader/> :
        <MoviesCardList
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
