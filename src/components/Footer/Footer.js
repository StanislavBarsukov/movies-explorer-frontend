import React from 'react';
import './Footer.css';
const today = new Date();

function Footer() {

  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <nav className="footer__nav">
          <a className="footer__nav-link" target="_blanck" href="https://practicum.yandex.ru/">Яндекс.Практикум</a>
          <a className="footer__nav-link" target="_blanck" href="https://github.com/">Github</a>
        </nav>
        <p className="footer__nav-date">&copy;&nbsp;{today.getFullYear()}</p>
      </div>
    </footer>
  );
}

export default Footer;
