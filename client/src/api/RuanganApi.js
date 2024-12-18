import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/ruangan`;

export const ruanganService = {
  getAllRuangan: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
};