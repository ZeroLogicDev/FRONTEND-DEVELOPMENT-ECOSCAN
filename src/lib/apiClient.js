import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  console.warn(
    'VITE_API_BASE_URL is not set. AI prediction features will not work.'
  );
}

/**
 * Axios instance pre-configured for the EcoScan FastAPI backend.
 * Base URL: https://zerologicdev-ecoscan-v2-api.hf.space
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30s — model inference can take time on cold start
  headers: {
    Accept: 'application/json',
  },
});

// Response interceptor for consistent error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(
        new Error('Request timed out. The AI server may be waking up — please try again.')
      );
    }
    if (!error.response) {
      return Promise.reject(
        new Error('Network error. Please check your internet connection.')
      );
    }
    return Promise.reject(error);
  }
);

export default apiClient;
