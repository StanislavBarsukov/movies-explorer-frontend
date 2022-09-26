import React from 'react';
import './MoviesCard.css';
import {useLocation} from "react-router-dom";

function MoviesCard({ img, name,duration }) {
  const location = useLocation().pathname;
  const [isLike, setLike] = React.useState(false);
  const toggleButtonLike = () => setLike(!isLike);
  return (
    <li className="movie">
      <img className="movie__img" src={img} alt={name}/>
      <div className="movie__container">
        <div className="movie__description">
          <h2 className="movie__title">{name}</h2>
          <p className="movie__time">{duration}</p>
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
