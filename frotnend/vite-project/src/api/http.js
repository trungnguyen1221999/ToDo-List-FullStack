import axios from 'axios';
const BASE_URL = import.meta.env.MODE === 'production' ? '' : 'http://localhost:5000';
const http = axios.create({
  baseURL: `${BASE_URL}/task`, // Backend server URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default http;
