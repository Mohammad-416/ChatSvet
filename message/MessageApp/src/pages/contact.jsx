import React, { useEffect, useState } from 'react';
import './contact.css'
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer/Footer';

function Contact() {

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
    <header>
        <h1>Contact Us</h1>
      </header>
      <section className="contact-info">
        <p>Feel free to reach out to us through the following contact details:</p>
        <ul>
          <li>Email: futuristiccoders@outlook.com</li>
          <li>Phone: +91 9971359949</li>
          <li><a href='https://github.com/Mohammad-416'>Github</a></li>
          <li><a href='https://x.com/CrazyG20974?s=09'>X</a></li>
          <li><a href='https://www.instagram.com/m.ahmad_mohammad/'>InstaGram</a></li>
          <li><a href='https://www.linkedin.com/in/m-ahmad-mohammad-a463bb291?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'>LinkedIn</a></li>
        </ul>
      </section>
    </div>
    <Footer/>
  </div>
  </>
  );
}

export default Contact;
