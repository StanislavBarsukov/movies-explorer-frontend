import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import More from '../More/More';

function Movies({ movies, onSearch, message, onSave, onDelete, moviesSave, onShort }) {

  const [ amount, setAmount ] = React.useState(() => {
    const windowWidth = window.innerWidth;
      if (windowWidth > 1020) {
        return 12
      } else if (windowWidth >= 760) {
        return 8
      } else  {
        return 5
      }
  });

  const [ moviesMore, setMoviesMore ] = React.useState(() => {
    const windowWidth = window.innerWidth;
      if (windowWidth > 768) {
        return 7
      } else if (windowWidth < 450) {
        return 5
      }
  });

  const handleResize = () => {
    const windowWidth = window.innerWidth;
      if (windowWidth > 1020) {
          setAmount(12)
          setMoviesMore(7)
        } else if (windowWidth >= 760) {
          setAmount(8)
          setMoviesMore(7)
        } else  {
          setAmount(5)
          setMoviesMore(5)
        }
  }
  const renderMovies = movies.slice(0, amount);
  const addMore = () => {
    setAmount(more => more + moviesMore)
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <main>
      <Header/>
      <SearchForm message={message} onSearch={onSearch} onShort={onShort}/>
      <MoviesCardList movies={renderMovies} onSave={onSave} onDelete={onDelete} moviesSave={moviesSave}/>
      <More onClick={addMore} movies={movies} renderMovies={renderMovies}/>
      <Footer/>
    </main>
  );
}

export default Movies;
