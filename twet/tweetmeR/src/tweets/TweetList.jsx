import React, { useState, useEffect } from "react";
import { fetchTweets } from "../lookup/components";
import Tweet from "./Tweet";
import TweetForm from "./TweetForm";
function TweetList(props) {
  const [tweets, setTweets] = useState([]);
  const [nextTweetslink, setNextTweetsLink] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTweets();
        setTweets(data.results);
        if (data.next) {
          setNextTweetsLink(data.next);
        }
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    };
    fetchData();
  }, []);
  const fetchData2 = async () => {
    try {
      if (nextTweetslink) {
        const data = await fetchTweets(nextTweetslink);
        setTweets((prevTweets) => [...prevTweets, ...data.results]);
        if (data.next) {
          setNextTweetsLink(data.next);
        } else {
          setNextTweetsLink(""); // Reset nextTweetslink if no more tweets are available
        }
      }
    } catch (error) {
      console.error("Error fetching tweets:", error);
    }
  };

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        fetchData2();
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [nextTweetslink]); // Include nextTweetslink as a dependency

  const addTweet = (newTweet) => {
    setTweets([newTweet, ...tweets]);
  };


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
            key={index}
            cname="layout"
          />
        ))}
      </ul>
    </div>
  );
}

export default TweetList;
