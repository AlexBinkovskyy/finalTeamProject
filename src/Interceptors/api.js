import axios from 'axios';

const api = axios.create({
  baseURL: 'https://finalteamproject-backend.onrender.com/api',
  //baseURL: 'http://localhost:10000/api',
  // withCredentials: true,
});

export default api;
