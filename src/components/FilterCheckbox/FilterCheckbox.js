import React from 'react';
import './FilterCheckbox.css';
import {useLocation} from 'react-router-dom';

function FilterCheckbox({ checked, checkedSave, checkToggle }) {
  const location = useLocation();
  return (
    <div className="checkbox">
      <div className="checkbox__container">
        <p className="checkbox__subtitle">Короткометражки</p>
        { location.pathname === "/movies" && (
          <input
            className={`checkbox__btn ${checked ? "checkbox__btn_on" : ''}`}
            onChange={checkToggle}
            checked={checked}
            type="checkbox"
        ></input>
        )}
        { location.pathname === "/save-movies" && (
          <input
            className={`checkbox__btn ${checkedSave ? "checkbox__btn_on" : ''}`}
            onChange={checkToggle}
            checked={checkedSave}
            type="checkbox"
          ></input>
        )}
      </div>
    </div>
  );
}

export default FilterCheckbox;
