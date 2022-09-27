import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import More from '../More/More';
import apiMovies from "../../utils/ApiMovies/ApiMovies";

function Movies() {
  const [ movies, setIsMovies] = React.useState([]);
  React.useEffect(() => {
    apiMovies.getMovies()
      .then((data) => {
        setIsMovies(data)
        console.log(data)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });

  }, []);
  return (
    <main>
      <Header/>
      <SearchForm/>
      <MoviesCardList movies={movies}/>
      <More/>
      <Footer/>
    </main>
  );
}

export default Movies;
