import React from 'react';
import "./More.css";

function More({onClick}) {
  return (
    <div className="more">
      <button onClick={onClick} type="button" className="more__button">Ещё</button>
    </div>
  )
}

export default More;
