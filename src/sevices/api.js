import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use((config) => {
 const userStorage = localStorage.getItem('user');
  if (userStorage) {
    const { token } = JSON.parse(userStorage);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;