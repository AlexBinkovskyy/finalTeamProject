import axios from 'axios';

const api = axios.create({
  // withCredentials: true,
  baseURL: 'https://finalteamproject-backend.onrender.com/api',
});

export default api;
