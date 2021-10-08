import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios"; 
import Navbar from 'react-bootstrap/Navbar'

function NavBar({loggedInUser, setCurrentLoggedInUser}) {
    const logoutUser = async () => {
        debugger;
        await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/logout`, null, {
          withCredentials: true,
        });
        setCurrentLoggedInUser("");
      };

      return loggedInUser ? (
        <>

        <nav className="nav-bar">
        <img className="logo" src="/logo1.png" alt="logo" width="100" height="100" /> 
          <ul className="nav-bar-ul">
          <li>
                <NavLink activeStyle={{ color: "white" }} exact to="/feed">
                 Feed
                </NavLink>
              </li>
                <li>
                <NavLink activeStyle={{ color: "white" }} to="/feed">
                Create Post
              </NavLink>
            </li>
            <li>
            {/* CurrentLoggedInUser */}
                <NavLink activeStyle={{ color: "white" }} to="/userprofile">
                User Profile
              </NavLink>
            </li>
          <li>
                <NavLink exact to="/">
                  <button onClick={logoutUser} className="nav-button">Logout</button>
                </NavLink>
              </li>
          </ul>
        </nav>
        <div className="Welcome">Start Jazzling 🤟 {loggedInUser.username}</div>
        </>
         ) : (
           <>
          
          
          <nav className="nav-bar">
          <img className="logo" src="/logo1.png" alt="logo" width="100" height="100" /> 
          <ul className="nav-bar-ul">    
            <li>
              <NavLink activeStyle={{ color: "white" }} to="/signup" >
                Signup
              </NavLink>
            </li>
            <li>
            
              <NavLink activeStyle={{ color: "white" }} to="/login">
                Login
              </NavLink>
            </li>
            <li>
                <NavLink activeStyle={{ color: "white" }} exact to="/feed">
                 Feed
                </NavLink>
              </li>
              
          </ul>
          </nav>
          
          <div className="Welcome"> Welcome to JAZZLE</div>
          </>
      );
    }

export default NavBar;