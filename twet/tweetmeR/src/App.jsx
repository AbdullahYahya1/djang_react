import React from "react";
import "./App.css";
import TweetForm from "./tweets/TweetForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TweetList from "./tweets/TweetList";
import TweetDetail from "./tweets/TweetDetail"; // Import the new component without curly braces

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<TweetList />} />
        <Route path="/tweet/:id" element={<TweetDetail />} /> 
      </Routes>
    </Router>
  );
}

export default App;
