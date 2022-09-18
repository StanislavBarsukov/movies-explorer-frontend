import React from 'react';
import './AboutMe.css';
import Img from '../../../images/profile-img.jpg';

function AboutMe() {
  return (
    <section className="profile">
      <h2 className="profile__title">Студент</h2>
      <div className="profile__container">
        <img
          className="profile__img"
          src={Img}
          alt="Изображение с человеком"
        />
        <div className="profile__about">
          <h3 className="profile__about-title">Станислав</h3>
          <p className="profile__about-subtitle">Фронтенд-разработчик, 24&nbsp;года</p>
          <p className="profile__about-text">
            Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет экономики СГУ.
            У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом.
            Недавно начал кодить. С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;.
            После того, как прошёл курс по&nbsp;веб-разработке, начал заниматься фриланс-заказами
            и&nbsp;ушёл с&nbsp;постоянной работы.
          </p>
          <a className="profile__about-link" target="_blanck" href="https://github.com/StanislavBarsukov">Github</a>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
