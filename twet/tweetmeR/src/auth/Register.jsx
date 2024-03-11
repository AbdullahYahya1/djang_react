import React, { useState } from 'react';
import authService from '../lookup/authService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const isValidEmail = (email) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  const isValidUsername = (username) => /^[A-Za-z0-9@./+/-/_]+$/.test(username);
  const isValidPassword = (password) => password.length >= 8;

  const validateForm = () => {
    const newErrors = {};

    if (!isValidUsername(username)) {
      newErrors.username = 'Username can only contain letters, numbers, and @/./+/-/_ characters.';
    }
    if (!isValidEmail(email)) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!isValidPassword(password)) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage('');
    if (!validateForm()) {
      setMessage("Please correct the errors before submitting.");
      return; 
    }
    authService.register(username, email, password).then(
      (response) => {
        setMessage(response.data.message);
        navigate('/login'); 

      },
      (error) => {
        let resMessage = "An unexpected error occurred.";
        if (error.response && error.response.data) {
          const backendErrors = Object.keys(error.response.data)
            .map(key => `${key}: ${error.response.data[key].join(" ")}`)
            .join("; ");
          resMessage = backendErrors || resMessage;
        }
        setMessage(resMessage);
      }
    );
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
