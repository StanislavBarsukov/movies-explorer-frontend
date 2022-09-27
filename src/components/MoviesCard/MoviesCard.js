import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

function MoviesCard({ movie, trailer, image, nameRU, duration }) {
  const location = useLocation().pathname;
  const [isLike, setLike] = React.useState(false);
  const toggleButtonLike = () => setLike(!isLike);

  const durationTime = (time) => {
    const hours = Math.trunc(time / 60);
    const min = time % 60;
    if(time < 60) {
      return `${min}м`
    }
    return `${hours}ч ${min}м`
  }

  return (
    <li className="movie">
      <a
        className="movie__link"
        target="_blank"
        href={trailer}
      >
        <img
          className="movie__img"
          src={image}
          alt={`Кадр из фильма ${nameRU}`}
        />
      </a>
      <div className="movie__container">
        <div className="movie__description">
          <h2 className="movie__title">{nameRU}</h2>
          <p className="movie__time">{durationTime(duration)}</p>
        </div>
        { location === "/movies" && (<button
          className={`movie__button ${isLike ? "movie__button_active" : ""}`}
          type="button"
          onClick={toggleButtonLike}
        >
        </button>)}
        { location ==="/save-movies" &&(<button
          className=" movie__button movie__button_delete"
          type="button"
        ></button>)}
      </div>
    </li>
  );
}

export default MoviesCard;
