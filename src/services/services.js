import axios from 'axios';

// Get the token from localStorage
const token = localStorage.getItem('jwt')?.replace(/"/g, '');

// Create an Axios instance with the token in the headers
export const Auth_Instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: token ? `token ${token}` : '',
  },
});

export const Geste_Instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
});
