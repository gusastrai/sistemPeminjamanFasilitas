import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/barang`;

export const barangService = {
  getAllBarang: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  createBarang: async (data) => {
    const response = await axios.post(API_URL, data);
    return response.data;
  },

  updateBarang: async (id, data) => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  },

  deleteBarang: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },
};
