import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import CleanBlock from '../CleanBlock/CleanBlock';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({
  movies, checkedSave, messageSave,
  moviesSave, onDelete, checkToggle,
  onSearchSave, moviesSaveShort }) {

  return (
    <main>
      <Header/>
      <SearchForm
        checkedSave={checkedSave}
        checkToggle={checkToggle}
        onSearchSave={onSearchSave}
        />
      <MoviesCardList
        messageSave={messageSave}
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
