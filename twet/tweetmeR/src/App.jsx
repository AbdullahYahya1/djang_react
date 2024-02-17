import React, { useEffect, useState } from "react";
import "./App.css";
import { TweetList } from "./tweets/index";
import TweetForm from "./tweets/components";
// App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TweetList } from "./components/TweetList";
import TweetDetail from "./components/TweetDetail"; // Import the new component

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={TweetList} />
        <Route path="/tweet/:id" component={TweetDetail} /> {/* Add this route */}
      </Switch>
    </Router>
  );
}

export default App;
