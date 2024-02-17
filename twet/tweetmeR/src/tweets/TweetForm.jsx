import React from "react";
import { PostTweet } from "../lookup/components";

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
    <form className="cool" onSubmit={handelsendTweet}>
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
