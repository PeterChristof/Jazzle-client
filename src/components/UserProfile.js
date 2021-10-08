import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Feed from "./Feed";

function UserProfile({ match }) {
  const [user, setUser] = useState({});
  const history = useHistory();



  useEffect(() => {
    async function getUserProfile() {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/userprofile`,
        { withCredentials: true }
      );
      console.log(response.data);
      setUser(response.data);
    }
    getUserProfile();
  }, []);

  const handleDeleteUser = async (id) => {
    await axios.delete(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/${id}`,);
    toast.success("User deleted");
    history.push("/");
  };


  return (
    <>
      <main className="userProfile" >
      
        <div className="userProfile1">
       <div> <h3>Your profile</h3>  <img className="logo" src="/PROFILE.png" alt="logo" width="100" height="100" /> </div>
       <div> <h4>Name: {user.username}</h4> </div>
       <div> <h4>Followers 🥁 {user.followers && user.followers.map((follower) => { 
          return <div>{follower.username}  </div>
        })}</h4> </div>
        <div> 
        <h4>
          {/* {user.username}  */}
        Following 🎶 {user.followings && user.followings.map((follow) => { 
          return <div>{follow.username}</div>
        })}</h4> </div>

       <div> <button className="nav-button" onClick={() => handleDeleteUser(user._id)}>Delete User</button> </div>
       </div>
      </main>
    </>
  );
}

export default UserProfile;