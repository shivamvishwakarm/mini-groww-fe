import axios from 'axios';
import { config } from '@/config/env';

const API_BASE_URL = `${config.apiBaseUrl}/api/v1`;

export const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});



// Add a response interceptor to handle errors
client.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access (e.g., redirect to login)
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);
