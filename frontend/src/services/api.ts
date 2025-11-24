/**
 * API Service
 * Centralized service for all HTTP requests to backend
 * Following best practice: One centralized reusable logic
 */

import axios from 'axios';
import type { AxiosInstance, AxiosError } from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../constants';

// Create axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - for adding auth tokens later
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token here when implemented
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle errors gracefully
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.message);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// API methods
export const api = {
  /**
   * Test backend connection
   */
  ping: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PING);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add more API methods as needed
};

export default apiClient;
