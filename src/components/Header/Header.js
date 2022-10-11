import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import Logo from '../../images/logo.svg';
import Auth from '../Auth/Auth';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {
  const location = useLocation().pathname;
  return (
    <header className={`${ location === "/" ?  "header header__landing" : "header"}` }>
      <Link  to="/">
        <img
          className="header__logo"
          src={Logo}
          alt="Круглый логоти с буквой внутри"
        />
      </Link>
      { loggedIn ? ( location === "/" && (<Navigation/>)) : ( location === "/" && (<Auth/>))}
      { location === "/profile" && ( <Navigation/>)}
      { location === "/movies" && ( <Navigation/>)}
      { location === "/save-movies" && ( <Navigation/>)}
    </header>
  );
}

export default Header;
