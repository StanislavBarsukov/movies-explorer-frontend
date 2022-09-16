import React from 'react';
import FormAuth from '../FormAuth/FormAuth';
import './Register.css';

function Register() {
  return (
    <FormAuth
      title="Добро пожаловать!"
      btnText="Зарегистрироваться"
      subtitle="Уже зарегистрированы?"
    >
        <label className="register__label">Имя</label>
        <input
          className="register__input"
          id="name"
          name="name"
          type="name"
          placeholder="Имя"
          required={true}
        />
        <label className="register__label">E-mail</label>
        <input
          className="register__input"
          id="email"
          name="email"
          type="email"
          placeholder="E-mail"
          required={true}
        />
        <label className="register__label">Пароль</label>
        <input
          className="register__input"
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          required={true}
        />
        <span className="register__error">Что-то пошло не так...</span>
    </FormAuth>
  );
}

export default Register;
