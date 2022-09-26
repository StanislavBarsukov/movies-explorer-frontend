import React from 'react';
import './Main.css';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import AboutProject from '../AboutProject/AboutProject';
import HeaderLanding from '../HeaderLanding/HeaderLanding';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

function Main ({loggedIn}) {
  return(
    <main>
      <Header loggedIn={loggedIn}/>
      <HeaderLanding/>
      <AboutProject/>
      <Techs/>
      <AboutMe/>
      <Portfolio/>
      <Footer/>
    </main>
  );
}

export default Main;
