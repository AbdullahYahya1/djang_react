import React, { useEffect, useState } from "react";
import "./App.css";
import { TweetList } from "./tweets/index";
import TweetForm from "./tweets/components";

function App(props) {
  const [csrftoken, setCsrftoken] = useState();
  return (
    <>
    <TweetList {...props}/>
    </>
  );
}

export default App;
