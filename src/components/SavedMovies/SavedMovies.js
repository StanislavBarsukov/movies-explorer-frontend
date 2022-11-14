import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import CleanBlock from '../CleanBlock/CleanBlock';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({
  movies, checkedSave, message,
  moviesSave, onDelete, checkToggle,
  onSearchSave, moviesSaveShort }) {

  console.log(moviesSaveShort)
  return (
    <main>
      <Header/>
      <SearchForm
        message={message}
        checkedSave={checkedSave}
        checkToggle={checkToggle}
        onSearchSave={onSearchSave}
        />
      <MoviesCardList
        onDelete={onDelete}
        moviesSave={moviesSave}
        movies={checkedSave ? moviesSaveShort : movies}
      />
      <CleanBlock/>
      <Footer/>
    </main>
  );
}

export default SavedMovies;
