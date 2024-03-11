import React from "react";
import { PostTweet } from "../lookup/components";
import { useNavigate } from "react-router-dom";
function TweetForm(props) {
  const textAreaRef = React.createRef();
  const navigate = useNavigate();
  async function handelsendTweet(e) {
    e.preventDefault();

    const tweetContent = textAreaRef.current.value.trim();
    if (tweetContent !== "") {
      try {
        const res = await PostTweet({ content: tweetContent }); 
        const newTweet = res;
        props.addTweet(newTweet);
        textAreaRef.current.value = "";
      } catch (error) {
        if (error.message === 'TokenExpired') {
          navigate('/login');
        }
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
