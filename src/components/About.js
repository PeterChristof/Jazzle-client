import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import ReactPlayer from "react-player";

function About({ match }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [songLink, setSongLink] = useState("");
  const history = useHistory();

  useEffect(() => {
    async function getPost() {
      const post = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/post/${match.params.id}`
      );

      setTitle(post.data.title);
      setDescription(post.data.description);
      setSongLink(post.data.songLink);
    }
    getPost();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const body = {
      title,
      description,
      songLink
    //   imageUrl: "http://someimage.com"
    };

    await axios.put(
      `${process.env.REACT_APP_SERVER_HOSTNAME}/post/${match.params.id}`,
      body
    );

    toast.success("Post updated");
    history.push("/post");
  };

  return (
    <>
    <main className="aboutSide">
     <div className="AboutText">
      <h4>What is it?</h4>
      </div>
      <div className="AboutText">
      <h5>Jazzle is a social media web app built using Mongo, Express, React.js and Node.js (MERN stack).
      It's a Platform to share your mood through music / favourite song / best concert with friends and the world.</h5>
      <br/>
      <h4>Who are we?</h4>
      <h5>2 Junior Full Stack Developers from Colombia and Austria.</h5>
      <br/>
      <h4>Our Core Values</h4>
      <h5>Be transparent</h5>
      <h5>Keep community at our center</h5>
      <h5>Connecting People</h5>
      <h5>Share Music - not Pictures, fake news...</h5>
      <ReactPlayer className="reactPlayer" url='https://www.youtube.com/watch?v=P2AU5ioxDAo' />

      {/* <a href="https://www.youtube.com/watch?v=P2AU5ioxDAo">Bahama Soul Club - No Words</a> */}
      </div>
      </main>
    </>
  );
}

export default About;