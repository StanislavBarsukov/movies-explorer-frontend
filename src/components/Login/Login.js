import React from 'react';
import './Login.css';
import FormAuth from '../FormAuth/FormAuth';
import useFormWithValidation from "../../utils/hook/Validate";

function Login({ handleLogin, message }) {
  const validation = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(validation.values.email, validation.values.password);
    validation.resetForm()
  };

  return (
    <FormAuth
      title="Рады видеть!"
      btnText="Войти"
      subtitle="Ещё не зарегистрированы?"
      onSubmit={handleSubmit}
      isDisabled={!validation.isValid}
      message={message}
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
        pattern="[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+"
        onChange={validation.handleChange}
        />
      <span className="login__error">{validation.errors.email}</span>
      <label className="login__label">Пароль</label>
      <input
        className="login__input"
        id="password"
        name="password"
        type="new-password"
        placeholder="Пароль"
        minLength="8"
        maxLength="30"
        required
        autoComplete="off"
        onChange={validation.handleChange}
        />
        <span className="login__error">{validation.errors.password}</span>
    </FormAuth>
  );
}

export default Login;
