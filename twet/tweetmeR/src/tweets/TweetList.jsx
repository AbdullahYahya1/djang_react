import React, { useState, useEffect } from "react";
import { fetchTweets } from "../lookup/components";
import Tweet from "./Tweet";
import TweetForm from "./TweetForm";
import { useNavigate } from "react-router-dom";

function TweetList(props) {
  const [tweets, setTweets] = useState([]);
  const [nextTweetsLink, setNextTweetsLink] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function initialFetch() {
      try {
        const data = await fetchTweets();
        setTweets(data.results);
        setNextTweetsLink(data.next || "");
        setHasMore(data.next != null);
      } catch (error) {
        if (error.message === 'TokenExpired') {
          navigate('/login');
        }
        console.error("Error fetching tweets:", error);
      }
    }
    initialFetch();
  }, [navigate]);

  async function fetchMoreTweets() {
    if (!nextTweetsLink || isLoading) return;
    setIsLoading(true);
    try {
      const data = await fetchTweets(nextTweetsLink);
      setTweets((prevTweets) => [...prevTweets, ...data.results]);
      setNextTweetsLink(data.next || "");
      setHasMore(data.next != null);
    } catch (error) {
      if (error.message === 'TokenExpired') {
        navigate('/login');
      }
      console.error("Error fetching more tweets:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    function handleScroll() {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && hasMore && !isLoading) {
        fetchMoreTweets();
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [nextTweetsLink, isLoading, hasMore]);

  function addTweet(newTweet) {
    setTweets([newTweet, ...tweets]);
  }

  return (
    <div>
      <TweetForm addTweet={addTweet} />
      <ul>
        {tweets.map((tweet, index) => (
          <Tweet
            tweet={tweet}
            addTweet={addTweet}
            setTweets={setTweets}
            tweets={tweets}
            key={tweet.id || index} // Assuming each tweet has a unique 'id'
            cname="layout"
          />
        ))}
      </ul>
      {isLoading && <p>Loading more tweets...</p>}
      {!hasMore && <p>You have reached the end of the list.</p>}
    </div>
  );
}

export default TweetList;
