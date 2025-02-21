import axios from 'axios';

const API_URL = 'https://blog-application-react-4zd1.onrender.com';

// Below is used so that backend can set cookies properly.
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default axiosInstance;

export { API_URL };
