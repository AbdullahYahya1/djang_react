import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../lookup/authService'; 

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    authService.login(username, password).then(
      () => {
        navigate('/');
      },
      (error) => {
        let resMessage = "Failed to log in. Check your username and password.";
        if (error.response && error.response.data) {
          const detailedMessage = Object.keys(error.response.data)
            .map(key => `${key}: ${error.response.data[key].join(" ")}`)
            .join("; ");
          resMessage = detailedMessage || resMessage;
        }
        setMessage(resMessage);
      }
    );
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {message && <div><p>{message}</p></div>}
      </form>
    </div>
  );
};

export default Login;
