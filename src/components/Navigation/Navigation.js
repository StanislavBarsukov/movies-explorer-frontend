import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleToggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <button className="nav__button-open" type="button" onClick={handleToggleMenu}></button>
      <div className={`nav ${isOpen? 'nav_active': ''}`}>
        <button className="nav__button-close" type="button" onClick={handleToggleMenu}></button>
        <div className="nav__container">
         <nav className="nav__links">
            <Link className="nav__link" to="/">Главная</Link>
            <Link className="nav__link" to="/movies">Фильмы</Link>
            <Link className="nav__link" to="/save-movies">Сохранённые фильмы</Link>
          </nav>
          <Link className="nav__link-profile" to="/profile">Аккаунт</Link>
        </div>
      </div>
    </>
  );
}

export default Navigation;
