import React from 'react';
import './Profile.css';
import Header from "../Header/Header";

function Profile() {
  return (
    <>
      <Header/>
      <form className="profile">
        <div className="profile__container">
          <h2 className="profile__title">Привет, Виталий!</h2>
          <div className="profile__form">
            <label className="profile__label">Имя
              <input
                className="profile__input"
                placeholder="Введите ваше имя"
                type="name"
              />
            </label>
            <label className="profile__label"> E-mail
              <input
                className="profile__input"
                placeholder="Введите ваш E-mail"
                type="email"
              />
            </label>
            <span className="profile__error">Ошибка</span>
          </div>
          <div className="profile__buttons">
            <button
              className="profile__button-edit"
              type="submit"
            >Редактировать</button>
            <button
              className="profile__button-exit"
              type="submit"
            >Выйти из аккаунта</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Profile;
