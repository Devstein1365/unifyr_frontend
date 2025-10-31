import axios from "axios";

// Base API URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3500/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("unifyr_user") || "{}");
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - logout user
      localStorage.removeItem("unifyr_user");
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  }
);

// Authentication endpoints
export const authAPI = {
  register: async (name, email, password) => {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  getMe: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put("/auth/profile", profileData);
    return response.data;
  },

  changePassword: async (currentPassword, newPassword) => {
    const response = await api.put("/auth/password", {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  resetPassword: async (email) => {
    const response = await api.post("/auth/reset-password", { email });
    return response.data;
  },
};

// Order management API
export const orderAPI = {
  createOrder: async (orderData) => {
    const response = await api.post("/orders", orderData);
    return response.data;
  },

  getUserOrders: async () => {
    const response = await api.get("/orders");
    return response.data;
  },

  getOrder: async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  updateOrder: async (orderId, updates) => {
    const response = await api.put(`/orders/${orderId}`, updates);
    return response.data;
  },

  deleteOrder: async (orderId) => {
    const response = await api.delete(`/orders/${orderId}`);
    return response.data;
  },

  getInvoice: async (orderId) => {
    const response = await api.get(`/orders/${orderId}/invoice`);
    return response.data;
  },

  getBulkInvoices: async (orderIds) => {
    const response = await api.post("/orders/bulk-invoices", { orderIds });
    return response.data;
  },
};

// Admin dashboard API (admin users only)
export const adminAPI = {
  getStats: async () => {
    const response = await api.get("/admin/stats");
    return response.data;
  },

  getAllOrders: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/admin/orders?${params}`);
    return response.data;
  },

  updateOrder: async (orderId, updates) => {
    const response = await api.put(`/admin/orders/${orderId}`, updates);
    return response.data;
  },

  deleteOrder: async (orderId) => {
    const response = await api.delete(`/admin/orders/${orderId}`);
    return response.data;
  },

  getAllUsers: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await api.get(`/admin/users?${params}`);
    return response.data;
  },

  updateUserRole: async (userId, role) => {
    const response = await api.put(`/admin/users/${userId}/role`, { role });
    return response.data;
  },
};

export default api;
