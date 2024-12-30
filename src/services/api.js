import axios from 'axios';

const API_URL = 'https://task-manager-backend-ojb9.onrender.com';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
