import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
  const [isActive, setIsActive] = React.useState(false);
  const toggleButton = () => setIsActive(!isActive);
  return (
    <div className="checkbox">
      <div className="checkbox__container">
        <p className="checkbox__subtitle">Короткометражки</p>
        <span onClick={toggleButton} className={`checkbox__btn ${isActive ? "checkbox__btn_on" : ''}`}></span>
      </div>
    </div>
  );
}

export default FilterCheckbox;
