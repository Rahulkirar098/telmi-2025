import axios from 'axios';

// Storage
import AsyncStorage from '@react-native-async-storage/async-storage';


const BASE_URL = 'http://18.224.251.67:8000/';


export const instance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    config.headers.authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    if (error.response) {
      return error.response;
    } else {
      return Promise.reject(error);
    }
  }
);
