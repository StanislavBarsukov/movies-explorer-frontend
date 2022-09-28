import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import CleanBlock from '../CleanBlock/CleanBlock';

function SavedMovies({ moviesSave, onDelete }) {
  return (
    <main>
      <Header/>
      <SearchForm/>
      <MoviesCardList  moviesSave={moviesSave} onDelete={onDelete}/>
      <CleanBlock/>
      <Footer/>
    </main>
  );
}

export default SavedMovies;
