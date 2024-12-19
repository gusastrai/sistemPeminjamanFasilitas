import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/admins`;

export const adminService = {
  getAllAdmins: async () => {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  },

  createAdmin: async (data) => {
    const response = await axios.post(API_URL, data);
    return response.data;
  },

  deleteAdmin: async (adminId) => {
    const response = await axios.delete(`${API_URL}/${adminId}`);
    return response.data;
  },
};
