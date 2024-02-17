import React from "react";

function Button(props) {
  const { tweet, action_method, handleTweetAction, text } = props;

  const handleClick = (e) => {
    handleTweetAction(e, tweet.id, action_method);
  };

  return <button onClick={handleClick}>{text}</button>;
}

export default Button;
