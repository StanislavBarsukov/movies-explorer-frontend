import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import More from '../More/More';

function Movies() {
  return (
    <main>
      <Header/>
      <SearchForm/>
      <MoviesCardList/>
      <More/>
      <Footer/>
    </main>
  );
}

export default Movies;
