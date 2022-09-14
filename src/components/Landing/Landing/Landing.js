import React from 'react';
import './Landing.css';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import AboutProject from '../AboutProject/AboutProject';
import HeaderLanding from '../HeaderLanding/HeaderLanding';
function Landing () {
  return(
    <>
      <Header/>
      <HeaderLanding/>
      <AboutProject/>
      <Footer/>
    </>
  );
}

export default Landing;
