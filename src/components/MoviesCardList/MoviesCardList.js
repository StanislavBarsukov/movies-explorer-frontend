import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies }) {

  return (
    <section className="movies">
      <ul className="movies__list">
        {movies.map((movie) => (
          <MoviesCard
            key={movie.id}
            movie={movie}
            nameRU={movie.nameRU}
            duration={movie.duration}
            image={`https://api.nomoreparties.co/${movie.image.url}`}
            trailer={movie.trailerLink}
          />
          ))}
      </ul>
    </section>
  );
}

export default MoviesCardList;
