import React, { useEffect, useState } from "react";

import { fetchTweets, PostTweet, buttonsApiActions } from "../lookup/components";

export function Tweet(props) {
  const { tweet, handleTweetAction } = props;

  return (
    <div className={props.cname}>
      <br />
      <p>
        id: <span>{tweet.id}</span>
        <br />
        {tweet.content}
      </p>
      <br />
      {tweet.parent && <div className="retweetTweet">
        retweet to : 
        <div>
            {tweet.parent.content}
        </div>
      </div>
      }
      <div>Likes: {tweet.likes_count}</div>

      <Button
        text="like"
        tweet={tweet}
        action_method="like"
        handleTweetAction={handleTweetAction}
      />

      <Button
        text="unlike"
        tweet={tweet}
        action_method="unlike"
        handleTweetAction={handleTweetAction}
      />
      <Button
        text="retweet"
        tweet={tweet}
        action_method="retweet"
        handleTweetAction={handleTweetAction}
      />
    </div>
  );
}

export function Button(props) {
  const { tweet, action_method, handleTweetAction } = props;

  const handleClick = (e) => {
    handleTweetAction(e, tweet.id, action_method);
  };

  return <button onClick={handleClick}>{props.text}</button>;
}

function TweetForm(props) {
  const textAreaRef = React.createRef();
  async function handelsendTweet(e) {
    e.preventDefault();

    const tweetContent = textAreaRef.current.value.trim();
    if (tweetContent !== "") {
      try {
        const res = await PostTweet({ content: tweetContent }); // Assuming PostTweet is an async function for making API calls
        const newTweet = res;
        props.addTweet(newTweet);
        textAreaRef.current.value = "";
      } catch (error) {
        console.log(
          "Error posting tweet we will not add it to the list:",
          error
        );
      }
    }
  }
  return (
    <form
      className="cool"
      onSubmit={handelsendTweet}
    >
      <textarea
        ref={textAreaRef}
        name="tweet"
        id=""
        cols="30"
        rows="10"
        required={true}
      ></textarea>
      <button type="submit">send tweet</button>
    </form>
  );
}
export default TweetForm;

export function TweetList(props) {
  const [tweets, setTweets] = useState([]);
  const [nextTweetslink, setNextTweetsLink] = useState("");
  console.log(props);
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

  const handleTweetAction = async (event, tweet_id, action) => {
    try {
      const response = await buttonsApiActions(action, tweet_id);
      if (response.status === 201 || response.status === 200) {
        if(action ==='retweet'){
            addTweet(response.data.tweet)
            return 
        }
        const updatedTweets = tweets.map((tweet) => {
          if (tweet.id === tweet_id) {
            if (action === "like" && !tweet.liked) {
              return {
                ...tweet,
                likes_count: tweet.likes_count + 1,
                liked: true,
              };
            } else if (action === "unlike" && tweet.liked) {
              return {
                ...tweet,
                likes_count: tweet.likes_count - 1,
                liked: false,
              };
            }
          }
          return tweet;
        });

        setTweets(updatedTweets);
      } else {
        console.error("Failed to update tweet. Status: ", response.status);
      }
    } catch (error) {
      console.error("Error occurred while updating tweet: ", error);
    }
  };

  const addTweet = (newTweet) => {
    setTweets([newTweet, ...tweets]);
  };

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

  return (
    <div>
      <TweetForm addTweet={addTweet} />
      <ul>
        {tweets.map((tweet, index) => (
            <Tweet
              tweet={tweet}
              key={index}
              cname="layout"
              handleTweetAction={handleTweetAction}
            />
        ))}
      </ul>
    </div>
  );
}
