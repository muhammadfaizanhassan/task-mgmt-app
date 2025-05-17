import axios from 'axios';

const api = axios.create({
  baseURL: 'https://task-mgmt-app-q9c3.onrender.com/api',
});

export default api;

