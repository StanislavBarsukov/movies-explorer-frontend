import React from 'react';
import './Landing.css';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import AboutProject from '../AboutProject/AboutProject';
import HeaderLanding from '../HeaderLanding/HeaderLanding';
import Techs from '../Techs/Techs';
import Profile from '../Profile/Profile';
import Portfolio from '../Portfolio/Portfolio';
function Landing () {
  return(
    <main>
      <Header/>
      <HeaderLanding/>
      <AboutProject/>
      <Techs/>
      <Profile/>
      <Portfolio/>
      <Footer/>
    </main>
  );
}

export default Landing;
