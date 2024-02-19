// auth.service.js
import axios from 'axios';

const TOKEN_KEY = 'access_token';

export const setAuthToken = (token) => {
  if (token) {
    // Set the token in the Authorization header for every request
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // Store the token in a secure way (e.g., in a secure cookie or local storage)
    localStorage.setItem(TOKEN_KEY, `Bearer ${token}`);
  } else {
    // If no token provided, remove it from the Authorization header
    delete axios.defaults.headers.common['Authorization'];
    // Remove the token from storage
    localStorage.removeItem(TOKEN_KEY);
  }
};