import React from 'react';
import './AboutProject.css';

function AboutProject() {

  return (
    <section className="about-project" id="about">
      <h2 className="about-project__title">О&nbsp;проекте</h2>
      <div className="about-project__container">
        <div className="about-project__text">
          <h3 className="about-project__subtitle">Дипломный проект включал 5&nbsp;этапов</h3>
          <p className="about-project__description">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.
          </p>
        </div>
        <div className="about-project__text">
          <h3 className="about-project__subtitle">На&nbsp;выполнение диплома ушло 5&nbsp;недель</h3>
          <p className="about-project__description">
            У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__time">
        <p className="about-project__time-black">1&nbsp;неделя</p>
        <p className="about-project__time-black">4&nbsp;недели</p>
        <p className="about-project__time-gray">Back-end</p>
        <p className="about-project__time-gray">Front-end</p>
      </div>
    </section>
  );

}

export default AboutProject;
