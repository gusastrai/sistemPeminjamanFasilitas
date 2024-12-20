import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/auth`;

export const authService = {
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};
