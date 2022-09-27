import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './FormAuth.css';
import Logo from '../../images/logo.svg';
import useFormWithValidation from "../../utils/hook/Validate";

function FormAuth({ title, children, btnText, subtitle, onSubmit}) {
  const location = useLocation().pathname;
  const validation = useFormWithValidation();

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
        onSubmit={onSubmit}
      >{children}
        <div className="form-auth__bottom">
          <button
            className={`${validation.isValid ? "form-auth__button" : "form-auth__button form-auth__button_disabled"}`}
            disabled={!validation.isValid}
          >{btnText}</button>
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
