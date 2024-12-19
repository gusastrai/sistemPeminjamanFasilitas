import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/barang`;

export const barangService = {
  getAllBarang: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
};
