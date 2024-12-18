import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/gedung`;

export const gedungService = {
  getAllGedung: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getGedungById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  createGedung: async (data) => {
    const response = await axios.post(API_URL, data);
    return response.data;
  },

  updateGedung: async (id, data) => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  },

  deleteGedung: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },
};