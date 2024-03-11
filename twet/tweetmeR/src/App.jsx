import React from "react";
import "./App.css";
import TweetForm from "./tweets/TweetForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TweetList from "./tweets/TweetList";
import TweetDetail from "./tweets/TweetDetail"; 
import Login from "./auth/Login"; 
import Register from "./auth/Register";

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
