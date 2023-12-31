import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_URL}/api`,
});

instance.interceptors.request.use((config) => {
  const expiresDate = window.localStorage.getItem('expires');
  const accessToken = window.localStorage.getItem('accessToken');
  const refreshToken = window.localStorage.getItem('refreshToken');

  let token;
  if (expiresDate < Date.now() || !accessToken) {
    token = refreshToken || '';
  } else {
    token = accessToken;
  }

  config.headers.Authorization = token;
  return config;
});

export default instance;
