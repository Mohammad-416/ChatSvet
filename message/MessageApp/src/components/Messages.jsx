import React, { useState, useEffect } from 'react';
import slugify from 'slugify';
import './message.css';
import Navbar from './Header/Navbar';
import Footer from './Footer/Footer';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

function Messages() {
  const {slug} = useParams();
  const [data, setData] = useState([]);
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);


  useEffect(() => {
    whoami().then((username) => {
      console.log("You are logged in as: " + username);
      
      let url =  process.env.REACT_APP_WS_SERVER + username + '/' + slugify(slug || '', { lower: true }) + '/';
      const newSocket = new WebSocket(url);
      setUsername(username);
      newSocket.addEventListener('open', (event) => {
        console.log('WebSocket connection opened:', event);
      });

      newSocket.addEventListener('message', (event) => {
        const receivedData = JSON.parse(event.data);

        if (receivedData.type === 'fetch_messages') {
          setData(receivedData.messages);

        } else {
          // Handle other message types or do something with individual messages
        }
      });

      newSocket.addEventListener('close', (event) => {
        console.log('WebSocket connection closed:', event);
      });

      setSocket(newSocket);
    });
  }, []);

  useEffect(() => {
    if (socket) {
      return () => {
        socket.close();
      };
    }
  }, [socket]);

  useEffect(() => {
    document.getElementById('BGVideo').play();
  }, []);

  const whoami = () => {
    return fetch("/authApp/whoami/", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("You are logged in as: " + data.username);
        return data.username;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const isResponseOk = (response) => {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
      //window.location = window.location.protocol+ "//" + window.location.hostname +":" +window.location.port + "/login";
    }
  };

  const navigate = useNavigate();

  const logout = () => {
    fetch("/authApp/logout", {
      credentials: "same-origin",
    })
      .then((res) => {
        return res.json();
      })
      .then(isResponseOk)
      .then((data) => {
        console.log(data);
        setIsAuthenticated(false);
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: 'message',
          message: message,
        })
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target.message.value;
  
    // Send a message to the server
    sendMessage(message);
  };


  return (
    <>
      <Navbar />
      <div className='VideoContainer'>
        <video autoplay playsinline muted loop id="BGVideo">
          <source src={`${window.location.origin}/static/media/Contact.mp4`} type="video/mp4"/>
        </video>
      </div>
      <div className='mainContent'>
        <div className="content" >
          <div className="message-area">
            <div className="message-container">
              {data.map((message) => (
              
                
                <div key={message.id} className="message">
                  <strong>{message.content}</strong><br />~{message.user}
                </div>
                
              ))}
            </div>
          
          <div className="message-form">
            <form onSubmit={handleSubmit} >
              <input type="text" name="message" placeholder="Write a message" />
              <button type='submit'>Send</button>
              </form>
          </div>
          </div>
          </div>
          {/*<div className="sticky-section">
            <NavLink to="/inbox"><button>Inbox</button></NavLink>
            <button onClick={logout}>Log Out</button>
              </div>*/}
          <Footer />
        
      </div>
    </>
  );
}

export default Messages;
