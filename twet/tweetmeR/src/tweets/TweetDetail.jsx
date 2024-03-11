import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchTweets } from "../lookup/components";
import { useNavigate } from "react-router-dom";

function TweetDetail(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tweet, setTweet] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTweets("http://localhost:8000/api/tweets/", id);
        setTweet(data);
      } catch (error) {
        if (error.message === 'TokenExpired') {
          navigate('/login');
        }
        console.error("Error fetching tweets:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <div>Another page</div>
      <br />
      {tweet && (
        <>
          <div>{tweet.content}</div>
          <div>{tweet.id}</div>
        </>
      )}
    </>
  );
}

export default TweetDetail;
