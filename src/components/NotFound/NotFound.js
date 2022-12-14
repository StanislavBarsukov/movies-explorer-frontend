import React from 'react';
import './NotFound.css';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (
    <section className="not-found">
      <div className="not-found__container">
        <h2 className="not-found__title">404</h2>
        <p className="not-found__subtitle">Страница не найдена</p>
        <button type="button" onClick={() => navigate(-1)}  className="not-found__link">Назад</button>
      </div>
    </section>
  );
}

export default NotFound;
