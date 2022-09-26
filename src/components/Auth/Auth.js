import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import './Auth.css';

function Auth() {
  const location = useLocation();

  return (
    <div>
      {location.pathname === "/" && (
        <nav className="auth">
          <Link to="/sign-up" className="auth__link">Регистрация</Link>
          <Link to="/sign-in" className="auth__link auth__link_login">Войти</Link>
        </nav>
      )}
    </div>
  );
}

export default Auth;
