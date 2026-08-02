import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message === 'Network Error') {
      error.userMessage = 'No internet connection. Please check your network.';
    } else if (error.response) {
      error.userMessage = `Server error: ${error.response.status}`;
    } else {
      error.userMessage = 'Something went wrong. Please try again.';
    }
    return Promise.reject(error);
  }
);

export default api;
