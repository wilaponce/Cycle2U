import axios from 'axios';

const apiService = axios.create({
  baseURL: process.env.NEXT_RENDER_BACKEND_URL || 'http://localhost:5000/api',
});

export default apiService;