import React from 'react';
import './Login.css';
import FormAuth from '../FormAuth/FormAuth';
import useFormWithValidation from "../../utils/hook/Validate";

function Login({ handleLogin }) {
  const validation = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(validation.values);
  };

  return (
    <FormAuth
      title="Рады видеть!"
      btnText="Войти"
      subtitle="Ещё не зарегистрированы?"
      onSubmit={handleSubmit}
    >
      <label className="login__label">Email</label>
      <input
        className="login__input"
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        required
        minLength="2"
        maxLength="30"
        autoComplete="off"
        onChange={validation.handleChange}
        />
      <span className="login__error">Что-то не так</span>
      <label className="login__label">Пароль</label>
      <input
        className="login__input"
        id="password"
        name="password"
        type="password"
        placeholder="Пароль"
        minLength="2"
        maxLength="30"
        required
        autoComplete="off"
        onChange={validation.handleChange}
        />
        <span className="login__error">Что-то не так</span>
    </FormAuth>
  );
}

export default Login;
