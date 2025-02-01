import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  register: (email: string, password: string, password2: string) =>
    api.post<{
      email: string;
      access: string;
      refresh: string
    }>('/auth/register/', { email, password, password2 }),

  login: (email: string, password: string) =>
    api.post<{ access: string; refresh: string }>('/auth/login/', { email, password }).then(res => {
        // Store tokens upon successful login
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        return res.data;
    }),

  refreshToken: () =>
    api.post<{ access: string }>('/auth/refresh/', {
      refresh: localStorage.getItem('refresh_token'),
    }).then(res => {
        // Update access token
        localStorage.setItem('access_token', res.data.access);
        return res.data;
    }),

  logout: () => {
    return api.post('/auth/logout/')
      .then(res => {
        // Remove tokens on logout
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        return res;
      });
  },
};

// List of routes that don't require authentication
const publicRoutes = ['/auth/register/', '/auth/login/', '/auth/refresh/'];

// Add request interceptor for JWT
api.interceptors.request.use(config => {
  // Check if the request is for a public route
  if (publicRoutes.includes(config.url)) {
    return config; // No Authorization header for public routes
  }

  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for token refresh
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Check if the error is due to an expired token, not for public routes
      if (!publicRoutes.includes(originalRequest.url)) {
        try {
          await authService.refreshToken();
          return api(originalRequest); // Retry the original request with the new token
        } catch (refreshError) {
          // Handle refresh token failure (e.g., redirect to login)
          console.error("Token refresh failed:", refreshError);
          // Optionally redirect to login or clear tokens here
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;