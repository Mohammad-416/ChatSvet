import React from "react";
import Cookie from "universal-cookie";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";
import './login.css';
import { NavLink, Navigate} from "react-router-dom";
//instantiating Cookies class by creating cookies object

const cookies = new Cookie();


class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      error: "",
      isAuthenticated: false,
      csrftoken: "",
    };
  }

  componentDidMount = () => {
    this.getSession();
    document.getElementById('BGVideo').play();
  }



  // Get Session Method
  getSession = () => {
    //// Make a GET request to the "/api/session/" URL with "same-origin" credentials
    fetch("/authApp/session/", {
      credentials: "same-origin",
    })
      .then((res) => res.json()) //// Parse the response as JSON
      .then((data) => {
        console.log(data); // Log the response data to the console
        //// If the response indicates the user is authenticated
        console.log(data.csrf_token);
        this.setState({ csrftoken: data.csrf_token });
        if (data.isAuthenticated) {
          this.setState({ isAuthenticated: true }); // Update the component's state
        } else {  // If the response indicates the user is not authenticated
          this.setState({ isAuthenticated: false }); // Update the component's state
        }
      })
      //// Handle any errors that occurred during the fetch
      .catch((err) => {
        console.log(err);
      });
  }

  //Who Am I method
  whoami = () => {
    fetch("/authApp/whoami/", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("You are logged in as: " + data.username);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleUserNameChange = (event) => {
    this.setState({ username: event.target.value });
  }

  isResponseOk(response) {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
      //window.location = window.location.protocol+ "//" + window.location.hostname +":" +window.location.port + "/login";
    }
  }



  //Login Mthod
  login = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // Make a POST request to the "/api/login/" URL with the form data
    var csrftoken = this.state.csrftoken;
    console.log(csrftoken, this.state.username, this.state.password);
    fetch("/authApp/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      credentials: "same-origin",
      body: JSON.stringify({ username: this.state.username, password: this.state.password }),
    })
      .then(this.isResponseOk)
      .then((data) => {
        console.log(data);
        this.setState({ isAuthenticated: true, username: "", password: "", error: "" });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: "Wrong username or password." });
      });
  }

  //Logout Method
  logout = () => {
    fetch("/authApp/logout", {
      credentials: "same-origin",
    })
      .then((res) => {
        if (res.redirected) {
          this.setState({ isAuthenticated: false });
          window.location.href = res.url;
          return;
        } return res.json();
      })
      .then(this.isResponseOk)
      //// Parse the response as JSON
      .then((data) => {
        console.log(data);
        this.setState({ isAuthenticated: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  loadInbox = () => {
    this.props.history.push("/inbox");
  }

  // UI Rendering using bootstrap 
  render() {
    if (!this.state.isAuthenticated) {
      return (
        <>
          <Navbar />
          <div className='VideoContainer'>
            <video autoplay playsinline muted loop id="BGVideo">
              <source src="static/media/Contact.mp4" type="video/mp4" />
            </video>
          </div>
          <div className='mainContent'>
            <div className="content" >
              <header>
                <h1>Login</h1>
              </header>
              <form className="login-form" onSubmit={this.login}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" className="form-control" id="username" name="username" value={this.state.username} onChange={this.handleUserNameChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Password</label>
                  <input type="password" className="form-control" id="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
                  <div>
                    {this.state.error &&
                      <small className="text-danger">
                        {this.state.error}
                      </small>
                    }
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <button type="button" className="btn btn-primary"><NavLink to="/register">Don't Have an Account?</NavLink></button>
              </form>
            </div>
            <Footer />
          </div>
        </>
      );
    }
    return <Navigate to="/inbox" />;
  }
}

export default Login;