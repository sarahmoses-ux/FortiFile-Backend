import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  timeout: 10000, // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
})  ; 

apiClient.interceptors.request.use(
    async (config) => {
        return config;
    },
    (error) =>  Promise.reject(error)
);

export default apiClient;