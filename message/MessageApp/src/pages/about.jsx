import React, { useEffect, useState } from 'react';
import './about.css'
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer/Footer';

function About() {

  useEffect(() => {
    document.getElementById('BGVideo').play();
  }, []);
  return (
  <>
  <Navbar/>
  <div className='VideoContainer'>
    <video autoplay playsinline muted loop id="BGVideo">
      <source src="static/media/About.mp4" type="video/mp4" />
    </video>
  </div>
  <div className='mainContent'>
    <div className="content" >
    <header>
            <h1>About Us</h1>
        </header>
        <section className="about-description">
            <p>Welcome to ChatSvet, the cutting-edge chat application brought to you by Futuristic Coders and meticulously crafted by Mohammad. At ChatSvet, we believe in fostering seamless communication and connection in the digital age. Our application is designed with a futuristic vision, ensuring a user-friendly interface and innovative features for an unparalleled chatting experience. Whether you're connecting with friends, family, or colleagues, ChatSvet is your go-to platform for secure, efficient, and enjoyable conversations.</p>
        </section>
    </div>
    <Footer/>
  </div>
  </>
  );
}

export default About;
