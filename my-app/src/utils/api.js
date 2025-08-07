import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://webprojectbackend-production-ef2c.up.railway.app',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});


API.interceptors.request.use((config) => {
  return config;
});


