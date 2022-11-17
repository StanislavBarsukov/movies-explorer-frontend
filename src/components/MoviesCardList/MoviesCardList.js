import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

function MoviesCardList({ moviesAll, movies, onSave, onDelete, moviesSave, message, messageSave }) {
  const location = useLocation().pathname;
  console.log(movies)
  return (
    <section className="movies">
      { message || messageSave ? ( <span className="movies__none">{message || messageSave}</span> ) :(
        <ul className="movies__list">
          { location === '/movies' && (moviesAll.map((movie) => (
              <MoviesCard
                key={movie.id}
                movie={movie}
                nameRU={movie.nameRU}
                duration={movie.duration}
                image={`https://api.nomoreparties.co/${movie.image.url}`}
                trailer={movie.trailerLink}
                onSave={onSave}
                onDelete={onDelete}
                moviesSave={moviesSave}
              />))
          )}
          { location === '/save-movies' && (movies.map((movie) => (
              <MoviesCard
                key={movie._id}
                movie={movie}
                nameRU={movie.nameRU}
                duration={movie.duration}
                image={movie.image}
                trailer={movie.trailerLink}
                onDelete={onDelete}
                moviesSave={moviesSave}
              />))
          )}
        </ul>
      )}
    </section>
  );
}

export default MoviesCardList;
