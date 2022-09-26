import React from 'react';
import './Portfolio.css';

function Portfolio() {

  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            href="https://stanislavbarsukov.github.io/how-to-learn/"
            target="_blanck"
          >Статичный сайт
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            href="https://stanislavbarsukov.github.io/travels/"
            target="_blanck"
          >Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            className="portfolio__link"
            href="https://stanislavbarsukov.github.io/mesto-react/"
            target="_blanck"
          >Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
