import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/peminjaman`;

export const peminjamanService = {
  createPeminjamanRuangan: async (data) => {
    const response = await axios.post(API_URL, data);
    console.log(data);
    return response.data;
  },
};
