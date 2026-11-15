import axios from 'axios';
import keycloak from './keycloak';

const baseURL = import.meta.env.VITE_BACKEND_API_BASE + '/api';
const api = axios.create({ baseURL });

api.interceptors.request.use(async (config) => {
  await keycloak.updateToken(30);
  config.headers.Authorization = `Bearer ${keycloak.token}`;
  return config;
});

export default api;
