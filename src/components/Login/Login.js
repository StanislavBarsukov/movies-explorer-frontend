import React from 'react';
import './Login.css';
import FormAuth from '../FormAuth/FormAuth';

function Login() {
  return (
    <FormAuth
      title="Рады видеть!"
      btnText="Войти"
      subtitle="Ещё не зарегистрированы?"
    >
        <label className="login__label">Email</label>
        <input
          className="login__input"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required={true}
        />
        <span className="login__error"></span>
        <label className="login__label">Пароль</label>
        <input
          className="login__input"
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          required={true}
        />
        <span className="login__error"></span>
    </FormAuth>
  );
}

export default Login;
