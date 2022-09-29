import React from 'react';
import "./More.css";

function More({onClick, movies, renderMovies}) {
  return (
    <div className="more">
      <button
        onClick={onClick}
        type="button"
        className={renderMovies.length=== movies.length ? "more__button_disabled" : "more__button"}
      >Ещё</button>
    </div>
  )
}

export default More;
