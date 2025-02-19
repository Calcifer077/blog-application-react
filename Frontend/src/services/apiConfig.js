import axios from 'axios';

const API_URL = 'http://127.0.0.1:3002';

// Below is used so that backend can set cookies properly.
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default axiosInstance;

export { API_URL };
