import React from 'react';
import {Link, useLocation} from "react-router-dom";
import './FormAuth.css';
import Logo from "../../images/logo.svg";

function FormAuth({ title, children, btnText, subtitle }) {
  const location = useLocation().pathname;
  return (
    <section className="form-auth">
      <div className="form-auth__top">
        <Link to="/">
          <img className="form-auth__logo" alt="круглый логотип с буквой внутри" src={Logo}/>
        </Link>
        <h2 className="form-auth__title">{title}</h2>
      </div>
      <form
        className="form"
        noValidate
      >{children}
        <div className="form-auth__bottom">
          <button className="form-auth__button">{btnText}</button>
          <p className="form-auth__subtitle">
            {subtitle}
            { location === "/sign-up" && (
            <Link to="/sign-in" className="form-auth__link">Войти</Link>)}
            { location === "/sign-in" && (
              <Link to="/sign-up" className="form-auth__link">Регистрация</Link>
            )}
          </p>
        </div>
      </form>
    </section>
  );
}

export default FormAuth;
