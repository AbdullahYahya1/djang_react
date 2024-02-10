import React from 'react';
import { createRoot } from 'react-dom/client'; // Adjusted import statement
import App from './App.jsx';
import './index.css';

const dataProps = {
  prop1: 'value1',
  prop2: 'value2',
  // Add more props as needed
};

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App {...dataProps} />
  </React.StrictMode>
);
