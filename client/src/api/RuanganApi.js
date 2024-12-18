import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/ruangan`;

export const ruanganService = {
  getAllRuangan: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getRuanganById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  getRuanganByGedungId: async (gedungId) => {
    const response = await axios.get(`${API_URL}/gedung/${gedungId}`);
    return response.data;
  },

  createRuangan: async (data) => {
    const response = await axios.post(API_URL, data);
    return response.data;
  },

  updateRuangan: async (id, data) => {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response.data;
  },

  deleteRuangan: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },
};
