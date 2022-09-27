import React from 'react';
import FormAuth from '../FormAuth/FormAuth';
import './Register.css';
import useFormWithValidation from '../../utils/hook/Validate';

function Register({ handleRegister }) {
  const validation = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(validation.values);
  };

  return (
    <FormAuth
      title="Добро пожаловать!"
      btnText="Зарегистрироваться"
      subtitle="Уже зарегистрированы?"
      onSubmit={handleSubmit}
      isDisabled={!validation.isValid}
    >
        <label className="register__label">Имя</label>
        <input
          className="register__input"
          id="name"
          name="name"
          type="name"
          placeholder="Имя"
          minLength="2"
          maxLength="30"
          required
          autoComplete="off"
          onChange={validation.handleChange}
        />
      <span className="register__error">{validation.errors.name}</span>
        <label className="register__label">E-mail</label>
        <input
          className="register__input"
          id="email"
          name="email"
          type="email"
          placeholder="E-mail"
          required
          minLength="2"
          maxLength="30"
          autoComplete="off"
          onChange={validation.handleChange}
        />
      <span className="register__error">{validation.errors.email}</span>
        <label className="register__label">Пароль</label>
        <input
          className="register__input"
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          minLength="8"
          maxLength="30"
          required
          autoComplete="off"
          onChange={validation.handleChange}
        />
        <span className="register__error">{validation.errors.password}</span>
    </FormAuth>
  );
}

export default Register;
