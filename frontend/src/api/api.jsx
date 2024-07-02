// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3500', // Replace with your actual API URL
});

export default api;
