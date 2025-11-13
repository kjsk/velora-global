// API Configuration for Production
const API_CONFIG = {
  // Development (local)
  development: 'http://localhost:3001',
  
  // Production (replace with your actual Railway URL)
  production: 'https://velora-server-production.up.railway.app'  // Change this to your actual Railway URL
};

// Current environment
const ENVIRONMENT = process.env.NODE_ENV || 'development';

// Export the appropriate API URL
export const API_BASE_URL = API_CONFIG[ENVIRONMENT];

// Usage in your components:
// import { API_BASE_URL } from '../config/api.config';
// fetch(`${API_BASE_URL}/api/exchange-rates`)