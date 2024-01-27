import React from 'react';
import './footer.css';
import { NavLink } from 'react-router-dom';


function Footer() {
    return(
    <>
    <div className='Footer'>
        <section class="bg-body-highlight py-6">
        <div class="container-small">
          <div class="row align-items-center">
            <div class="col-md-6 text-center text-md-start">
              
              <p class="pe-md-5">Thank you for using our product, ChatSvet to chat securely and instantly with it! Enjoy ChatSvet!</p>
            </div>
            <div class="col-md-6">
              <div class="d-lg-flex justify-content-lg-end text-center"><NavLink className="me-4" to="/register">Register</NavLink><NavLink className="me-4" to="/contact">Contact</NavLink><NavLink className="me-4" to="/about">About Us</NavLink></div>
            </div>
          </div>
        </div>
      </section>
      <footer class="footer d-flex justify-content-center border-0">
        <div class="row g-0 justify-content-between align-items-center h-100">
          <div class="col-12 col-sm-auto text-center">
            <p class="mb-0 mt-2 mt-sm-0 text-white">This Project is built and maintained by Mohammad<span class="d-none d-sm-inline-block"></span><span class="d-none d-sm-inline-block mx-1">|</span><br class="d-sm-none" />2024 ©<a class="mx-1" href="https://themewagon.com">Futuristic Coders</a></p>
          </div>
          <div class="col-12 col-sm-auto text-center">
            <p class="mb-0 text-white-tertiary text-opacity-85">v1.1.0</p>
          </div>
        </div>
      </footer>
    </div>
    </>
    );
}

export default Footer;
