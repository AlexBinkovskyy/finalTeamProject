import axios from 'axios';

const api = axios.create({
  baseURL: 'https://finalteamproject-backend.onrender.com/api',
});

export default api;
