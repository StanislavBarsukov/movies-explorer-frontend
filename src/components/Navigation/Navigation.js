import React from 'react';
import './Navigation.css';
import {Link, useLocation} from 'react-router-dom';

function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation().pathname;
  const handleToggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <button className="nav__button-open" type="button" onClick={handleToggleMenu}></button>
      <div className={`nav ${isOpen? "nav_active": ""}`}>
        <button className="nav__button-close" type="button" onClick={handleToggleMenu}></button>
        <div className="nav__container">
         <nav className="nav__links">
            <Link className="nav__link " to="/">Главная</Link>
            <Link className={ location ==="/movies" ? "nav__link nav__link_active" : "nav__link"}
                  to="/movies">Фильмы</Link>
            <Link className={ location ==="/save-movies" ? "nav__link nav__link_active" : "nav__link"}
                  to="/save-movies">Сохранённые фильмы</Link>
          </nav>
          <Link className={ location ==="/profile" ? "nav__link-profile nav__link-profile_active" : "nav__link-profile"}
                to="/profile">Аккаунт</Link>
        </div>
      </div>
    </>
  );
}

export default Navigation;
