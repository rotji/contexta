/**
 * API Service
 * Centralized service for all HTTP requests to backend
 * Following best practice: One centralized reusable logic
 */

import axios from 'axios';
import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
// Extend AxiosRequestConfig to allow custom _retry property
type CustomAxiosRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean };
import { API_BASE_URL, API_ENDPOINTS, ROUTES } from '../constants';

// Logout handler to be set by AuthContext
let logoutHandler: (() => void) | null = null;
export const setLogoutHandler = (handler: () => void) => {
  logoutHandler = handler;
};

// Create axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add JWT token if present
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      if (config.headers) {
        (config.headers as any)['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - for global error handling
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig | undefined;
    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              (originalRequest.headers as any)['Authorization'] = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const refreshResponse = await apiClient.post('/api/auth/refresh', {}, { withCredentials: true });
        const { token } = refreshResponse.data;
        if (token) {
          localStorage.setItem('token', token);
          processQueue(null, token);
          if (originalRequest.headers) {
            (originalRequest.headers as any)['Authorization'] = `Bearer ${token}`;
          }
          return apiClient(originalRequest);
        } else {
          processQueue(new Error('No token in refresh response'), null);
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        // Call logout handler if set, otherwise fallback to redirect
        localStorage.removeItem('token');
        if (logoutHandler) {
          logoutHandler();
        } else {
          window.location.href = ROUTES.HOME;
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    // Handle other errors gracefully
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
     * User signup
     */
    signup: async (email: string, password: string) => {
      try {
        const response = await apiClient.post(API_ENDPOINTS.SIGNUP, { email, password });
        // Store token in localStorage for session persistence
        if (response.data.token) localStorage.setItem('token', response.data.token);
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    /**
     * User login
     */
    login: async (email: string, password: string) => {
      try {
        const response = await apiClient.post(API_ENDPOINTS.LOGIN, { email, password });
        if (response.data.token) localStorage.setItem('token', response.data.token);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
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

  /**
   * Fetch all conversations
   */
  getConversations: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.CONVERSATIONS);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Save a conversation
   */
  saveConversation: async (data: {
    transcript: string;
    aiResponse: string;
    nuancedOptions: any[];
  }) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.CONVERSATIONS, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get AI response for a transcript
   */
  askAi: async (transcript: string) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AI_RESPONSE, { transcript });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default apiClient;
