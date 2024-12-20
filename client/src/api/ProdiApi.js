import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/prodi`;

export const prodiService = {
  getAllProdi: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};
