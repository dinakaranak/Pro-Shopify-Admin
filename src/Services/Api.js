import axios from 'axios';

const Api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
});

// Add the token dynamically for each request
Api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken'); // or sessionStorage, or from your auth context
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default Api;
