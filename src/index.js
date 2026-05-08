import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Tailwind aur custom CSS ke liye zaroori hai
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
