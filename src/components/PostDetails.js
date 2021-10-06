import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

function PostDetails({ match }) {
  const [post, setPost] = useState({});
  const history = useHistory();

  useEffect(() => {
    async function getPostDetails() {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/posts/${match.params.id}`
      );
      setPost(response.data);
    }
    getPostDetails();
  }, []);

  const handleDeletePost = async () => {
    await axios.delete(
      `${process.env.REACT_APP_SERVER_HOSTNAME}/post/${match.params.id}`
    );
    toast.success("Post deleted");
    history.push("/feed");
  };

  

  return (
    <>
    <main className="detailsPage">
      <h4>Do you really want to delete this Post?</h4>
      

      <NavLink to={`/post/${post._id}/edit`}>Edit</NavLink>
      <button className="nav-button" onClick={handleDeletePost}>Delete</button>
      </main>
    </>
  );
}

export default PostDetails;