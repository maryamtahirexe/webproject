import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://98.81.143.34:5000',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});


API.interceptors.request.use((config) => {
  return config;
});


