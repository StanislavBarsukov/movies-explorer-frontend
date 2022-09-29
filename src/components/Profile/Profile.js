import React from 'react';
import './Profile.css';
import Header from '../Header/Header';
import useFormWithValidation from '../../utils/hook/Validate';

function Profile({ handleUpdateUser, handleLogout }) {
  const [ isDisabledForm, setDisabledForm ]= React.useState("");
  const validation = useFormWithValidation();
  const handleToggleButton = () => setDisabledForm(!isDisabledForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser(validation.values);
  };

  return (
    <>
      <Header/>
      <form
        className="profile"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="profile__container">
          <h2 className="profile__title">Привет, Виталий!</h2>
          <div className="profile__form">
            <label className="profile__label">Имя
              <input
                className="profile__input"
                placeholder="Введите ваше имя"
                id="name"
                name="name"
                type="name"
                required
                minLength="2"
                maxLength="30"
                autoComplete="off"
                onChange={validation.handleChange}
              />
            </label>
            <span className="profile__error">{validation.errors.name}</span>
            <label className="profile__label"> E-mail
              <input
                className="profile__input"
                placeholder="Введите ваш E-mail"
                id="email"
                name="email"
                type="email"
                required
                minLength="2"
                maxLength="30"
                autoComplete="off"
                pattern="[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+"
                onChange={validation.handleChange}
              />
            </label>
            <span className="profile__error">{validation.errors.email}</span>
          </div>
          {!isDisabledForm ? (
            <div className="profile__buttons">
            <button
              className="profile__button-edit"
              onClick={handleToggleButton}
              type="button"
            >Редактировать</button>
            <button
              className="profile__button-exit"
              type="submit"
              onClick={handleLogout}
            >Выйти из аккаунта</button>
          </div>
          ):(
            <button
              type="submit"
              className={`profile__button-save ${!validation.isValid ? "profile__button-save_disabled" : ''}`}
              disabled={!validation.isValid}
              onClick={handleToggleButton}
            >Сохранить</button>
          )}
        </div>
      </form>
    </>
  );
}

export default Profile;
