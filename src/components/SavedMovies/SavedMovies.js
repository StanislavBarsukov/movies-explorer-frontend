import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import CleanBlock from '../CleanBlock/CleanBlock';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ movies, moviesSave, onDelete, onSearchSave, message }) {
  const filter = () => {

  }

  return (
    <main>
      <Header/>
      <SearchForm onSearchSave={onSearchSave} message={message}/>
      <MoviesCardList movies={movies} moviesSave={moviesSave} onDelete={onDelete}/>
      <CleanBlock/>
      <Footer/>
    </main>
  );
}

export default SavedMovies;
