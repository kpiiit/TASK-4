import axios from 'axios';
export const baseURL = import.meta.env.PROD
  ? import.meta.env.VITE_APP_API_URL_PROD
  : import.meta.env.VITE_APP_API_URL_DEV;

export const httpHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
});
export const http = axios.create({
  baseURL,
});
http.interceptors.request.use((config) => {
  config.headers = {
    ...(config.headers || {}),
    ...httpHeaders(),
  };
  return config;
});
http.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.message === 'Network Error') {
      alert('Network Error');
    }
   
    if (err.response?.status === 403) {
      window.location.href = '/forbidden';
    }
    if (
      err.response?.data?.statusCode === 401 &&
      err.config?.method === 'get'
    ) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);
