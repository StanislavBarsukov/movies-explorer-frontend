import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Cards from '../../utils/cards';

function MoviesCardList() {
  const [ isMovies, setIsMovies] = React.useState([]);
  const getMovies = () => setIsMovies(Cards);

  React.useEffect(() => {
    getMovies()
  }, []);

  return (
    <section className="movies">
      <ul className="movies__list">
        {isMovies.map((movie, index) => (
          <MoviesCard
            key={index}
            name={movie.name}
            duration={movie.duration}
            img={movie.img}
          />
          ))}
      </ul>
    </section>
  );
}

export default MoviesCardList;
