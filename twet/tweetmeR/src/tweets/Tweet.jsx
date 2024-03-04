import React from "react";
import Button from "./Button";
import { buttonsApiActions } from "../lookup/components";
function Tweet(props) {
  const { tweet, addTweet, setTweets, tweets, cname } = props;
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
            if (action === "like" && !tweet.like_status) {
              return {
                ...tweet,
                likes_count: tweet.likes_count + 1,
                like_status: true,
              };
            } else if (action === "unlike" && tweet.like_status) {
              return {
                ...tweet,
                likes_count: tweet.likes_count - 1,
                like_status: false,
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
  return (
    <div className={cname}>
      <br />
      <p>
        id: <span>{tweet.id}</span>
        <br />
        {tweet.content}
      </p>
      <br />
      {tweet.parent && (
        <div className="retweetTweet">
          retweet to :
          <div>{tweet.parent.content}</div>
        </div>
      )}
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

export default Tweet;
