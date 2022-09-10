import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import Logo from '../../images/logo.svg';
import Auth from '../Auth/Auth';

function Header() {
  const location = useLocation();
  return (
    <header className={`${ location.pathname === "" ? "header" : " header header__landing"}`}>
      <Link  to="/">
        <img
          className="header__logo"
          src={Logo}
          alt="Круглый логоти с буквой внутри"
        />
      </Link>
      <Auth/>
    </header>
  );
}

export default Header;
