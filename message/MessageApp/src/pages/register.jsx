import React from 'react';
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer/Footer';
import { NavLink } from 'react-router-dom';

class Registeration extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            name: "",
            email: "",
            error: "",
            csrftoken: "",
        };
    }

    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    }

    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }
    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    handleUserNameChange = (event) => {
        this.setState({ username: event.target.value });
    }

    componentDidMount = () => {
        this.getSession();
        document.getElementById('BGVideo').play();
    }


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
            })
            //// Handle any errors that occurred during the fetch
            .catch((err) => {
                console.log(err);
            });
    }

    isResponseOk(response) {
        if (response.status >= 200 && response.status <= 299) {
            return response.json();
        } else {
            throw Error(response.statusText);
        }
    }

    //Login Mthod
    register = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        // Make a POST request to the "/api/login/" URL with the form data
        var csrftoken = this.state.csrftoken;
        console.log(csrftoken, this.state.name, this.state.email, this.state.username, this.state.password);
        fetch("/authApp/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrftoken,
            },
            credentials: "same-origin",
            body: JSON.stringify({ username: this.state.username, password: this.state.password, name: this.state.name, email: this.state.email }),
        })
            .then(this.isResponseOk)
            .then((data) => {
                console.log(data);
                this.setState({error: "Your Account Has Been Successfully Created, Check Your Email to verify your account, If the activation email is not there, check the spam folder"});
            })
            .catch((err) => {
                console.log(err);
                this.setState({ error: "Wrong username or password." });
            });
    }

    loadLogin = () => {
        window.location = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/login";
    }

    render() {
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
                            <h1>Register</h1>
                        </header>
                        <form id="registrationForm" className='login-form' onSubmit={this.register}>
                            <div>
                                {this.state.error && <small className="text-danger">{this.state.error}</small>}
                            </div>
                            <div className="form-group">
                                <label for="name">Name:</label>
                                <input type="text" required class="form-control" id="username" name="name" value={this.state.name} onChange={this.handleNameChange} />
                            </div>
                            <div className="form-group">
                                <label for="username">Username:</label>
                                <input type="text" required class="form-control" id="username" name="name" value={this.state.username} onChange={this.handleUserNameChange} />
                            </div>
                            <div className="form-group">
                                <label for="email">Email:</label>
                                <input type="email" required class="form-control" id="email" name="email" value={this.state.email} onChange={this.handleEmailChange} />
                            </div>
                            <div className="form-group">
                                <label for="password">Password:</label>
                                <input type="password" required class="form-control" id="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
                            </div>
                            <button type="submit" class="btn btn-primary btn-block">Register</button>
                            <button type="button" className="btn btn-primary"><NavLink to="/login">Already Have an Account?</NavLink></button>
                        </form>
                    </div>
                    <Footer />
                </div>
            </>
        );
    }
}

export default Registeration;
