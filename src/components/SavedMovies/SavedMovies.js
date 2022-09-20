import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import CleanBlock from '../CleanBlock/CleanBlock';

function SavedMovies() {
  return (
    <main>
      <Header/>
      <SearchForm/>
      <MoviesCardList/>
      <CleanBlock/>
      <Footer/>
    </main>
  );
}

export default SavedMovies;
