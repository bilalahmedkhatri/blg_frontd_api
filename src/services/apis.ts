import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/blog', // Your API base URL
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor to add auth token if available
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Auth methods
const signup = async (formData: any) => {
  const response = await api.post('/auth/signup/', formData);
  return response.data;
};

const login = async (credentials: any) => {
  const response = await api.post('/auth/login/', credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify({
      id: response.data.user_id,
      username: response.data.username,
      email: response.data.email
    }));
  }
  return response.data;
};

const logout = async () => {
  try {
    await api.post('/auth/logout/');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Logout error:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

const googleSignUp = async () => {
  const response = await api.get('/auth/google');
  return response.data;
};

export default {
  // Auth
  signup,
  login,
  logout,
  googleSignUp,

  // Posts
  getPosts: () => api.get('/posts/'),
  getPost: (slug) => api.get(`/posts/${slug}/`),
  createPost: (postData) => {
    // Update headers for multipart/form-data
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return api.post('/posts-create/', postData, config);
  },
  updatePost: (slug, postData) => api.put(`/posts/${slug}/update/`, postData),
  deletePost: (slug) => api.delete(`/posts/${slug}/delete/`),

  // category
  getcategory: () => api.get('/category/'),
  createCategory: (data) => api.post('/category/create/', data),
  updateCategory: (id, data) => api.put(`/category/${id}/`, data),
  deleteCategory: (id) => api.delete(`/category/${id}/delete/`),

  // Tags
  getTags: () => api.get('/tags/'),
  createTag: (data) => api.post('/tags/', data),
  updateTag: (id, data) => api.put(`/tags/${id}/`, data),
  deleteTag: (id) => api.delete(`/tags/${id}/`),

  // Users
  getCurrentUser: () => api.get('/users/me/'),
  updateProfile: (data) => api.put('/users/profile/', data),
};