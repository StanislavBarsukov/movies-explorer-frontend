import React from 'react';
import './HeaderLanding.css';
import Logo from '../../../images/landing-logo.svg'
import { Link } from 'react-scroll';

function HeaderLanding() {

  return (
    <section className="header-landing">
      <img
        className="header-landing__logo"
        src={Logo}
        alt="Логотип похожей на землю сделанный из надписей"
      />
      <div className="header-landing__container">
          <h1 className="header-landing__title">Учебный проект студента факультета Веб-разработки.</h1>
          <p className="header-landing__subtitle">Листайте ниже, чтобы узнать больше про этот проект и&nbsp;его создателя.</p>
          <Link
            className="header-landing__button"
            to="about"
            smooth={true}
            duration={1000}
            delay={500}
          >
            Узнать больше
          </Link>
      </div>
    </section>
  );
}

export default HeaderLanding;
