import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/peminjamanbarang`;

export const peminjamanBarangService = {
  createPeminjamanBarang: async (idBarang, formData) => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const idUser = decodedToken.id;

      formData.append("idUser", idUser);
      formData.append("idBarang", idBarang);

      const response = await axios.post(`${API_URL}/${idBarang}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  getAllPeminjamanBarang: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  getPeminjamanBarangById: async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  getPeminjamanByUser: async () => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.id;

      const response = await axios.get(`${API_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  approvePeminjamanBarang: async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${API_URL}/${id}/approve`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  rejectPeminjamanBarang: async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${API_URL}/${id}/reject`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  getAllPeminjamanBarangAcc: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/accepted`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};
