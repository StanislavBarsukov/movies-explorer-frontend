import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

function NotFound() {

  return (
    <section className="not-found">
      <div className="not-found__container">
        <h2 className="not-found__title">404</h2>
        <p className="not-found__subtitle">Страница не найдена</p>
        <Link className="not-found__link" to="/">Назад</Link>
      </div>
    </section>
  );
}

export default NotFound;
