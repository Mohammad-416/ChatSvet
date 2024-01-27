import React, { useEffect, useState } from 'react';
import Users from '../components/Users';
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer/Footer';
import './inbox.css';

function Inbox() {
    useEffect(() => {
        document.getElementById('BGVideo').play();
    }, []);
    return (
        <>
            <Navbar />
            <div className='VideoContainer'>
                <video autoplay playsinline muted loop id="BGVideo">
                    <source src="static/media/About.mp4" type="video/mp4" />
                </video>
            </div>
            <div className='mainContent'>
                <div className="content" >
                    <header>
                        <h1>Inbox</h1>
                    </header>
                    <Users />
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Inbox;
