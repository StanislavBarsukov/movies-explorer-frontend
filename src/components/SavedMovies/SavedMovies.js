import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies() {
  return (
    <main>
      <Header/>
      <SearchForm/>
      <Footer/>
    </main>
  );
}

export default SavedMovies;
