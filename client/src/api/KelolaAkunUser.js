import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/users`;

export const userService = {
  getAllUsers: async () => {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  },

  updateUserStatus: async (userId, status) => {
    const response = await axios.put(`${API_URL}/${userId}/status`, { status });
    return response.data;
  },

  deleteUser: async (userId) => {
    const response = await axios.delete(`${API_URL}/${userId}`);
    return response.data;
  },
};