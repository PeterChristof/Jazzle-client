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
      setUser(response.data);
    }
    getUserProfile();
  }, []);

  const handleDeleteUser = async (id) => {
    await axios.delete(`${process.env.REACT_APP_SERVER_HOSTNAME}/users/id`);
    toast.success("User deleted");
    history.push("/");
  };


  return (
    <>
      <main className="userProfile">
        <h1>Your Profile:</h1>
        <h2>Name: {user.username}</h2>
        <h3>Followers: {user.followers && user.followers.map((follower) => { 
          return <div>{follower.username}</div>
        })}</h3>
        <h3>{user.username} follows: {user.followings && user.followings.map((follow) => { 
          return <div>{follow.username}</div>
        })}</h3>

        <button onClick={() => handleDeleteUser(user)}>Delete User</button>
      </main>
    </>
  );
}

export default UserProfile;
