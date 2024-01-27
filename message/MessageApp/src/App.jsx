import React, { useEffect, useState } from 'react';
import './App.css'
import Navbar from './components/Header/Navbar';
import Footer from './components/Footer/Footer';
import { NavLink } from 'react-router-dom';

function App() {

  useEffect(() => {
    document.getElementById('BGVideo').play();
  }, []);
  return (
  <>
  <Navbar/>
  <div className='VideoContainer'>
    <video autoplay playsinline muted loop id="BGVideo">
      <source src="static/media/Contact.mp4" type="video/mp4" />
    </video>
  </div>
  <div className='mainContent'>
    <div className="content" >
      <h1 className='Heading'>ChatSvet</h1>
      <h3 className='Description'>A Real Time Messaging Application Built for Secure <br/> and Synced Connections and Chatting.</h3>
      <h3 className='Slogan'>You Talk, We Deliver</h3>
      <button className='Btn'><NavLink to="/login">Try ChatSvet</NavLink></button>
      <button className='Btn'><NavLink to="/register">Create Account</NavLink></button>
    </div>
    <Footer/>
  </div>
  </>
  );
}

export default App;
