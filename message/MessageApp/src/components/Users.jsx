import React, { useEffect, useState } from 'react';
import slugify from 'react-slugify';
import './users.css';
import { NavLink } from 'react-router-dom';

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      users: [],
    };
  }

  getUsers = () => {
    fetch("/inboxApi/view/", {
      credentials: "same-origin",
    })
      .then((res) => {
        if (res.redirected) {
          window.location.href = res.url;
          return;
        } return res.json();
      }) //// Parse the response as JSON
      .then((data) => {
        console.log(data);
        this.setState({ users: data.data });
      })
      //// Handle any errors that occurred during the fetch
      .catch((err) => {
        console.log(err);
      });
  }


  componentDidMount = () => {
    this.getUsers();
  }



  render() {
    return (
      <>
        <div className='scrollable-area'>
          <ul>
            {this.state.users.map((user) => (
              <li key={user.id}>                
                <NavLink to={`/chat/${slugify(user.username)}`}><button><strong>{user.name}</strong><br/>@{user.username}</button></NavLink>
              </li>
            ))}
          </ul>
        </div>
      </>)
  }
}

export default Users;
