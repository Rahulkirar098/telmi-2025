import axios from 'axios';

// Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://18.224.251.67:8000/';


export const instance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json"}
});

instance.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      return error.response;
    } else {
      return Promise.reject(error);
    }
  }
);
