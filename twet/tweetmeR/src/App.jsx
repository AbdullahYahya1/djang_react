import React from "react";
import "./App.css";
import TweetForm from "./tweets/TweetForm"; // Ensure this is used or removed based on your needs
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TweetList from "./tweets/TweetList";
import TweetDetail from "./tweets/TweetDetail"; // Correctly imported without curly braces
import Login from "./auth/Login"; // Assuming Login component is in the auth folder
import Register from "./auth/Register"; // Assuming Register component is in the auth folder

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TweetList />} />
        <Route path="/tweet/:id/" element={<TweetDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
