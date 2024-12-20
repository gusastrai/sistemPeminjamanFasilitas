import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/peminjamanruangan`; 

export const peminjamanRuanganService = {
  createPeminjamanRuangan: async (idRuangan, formData) => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const idUser = decodedToken.id;

      formData.append("idUser", idUser);
      formData.append("idRuangan", idRuangan);

      const response = await axios.post(`${API_URL}/${idRuangan}`, formData, {
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

  getAllPeminjaman: async () => {
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

  getPeminjamanRuanganById: async (id) => {
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

  getPeminjamanRuanganByUser: async () => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.id;
  
      const response = await axios.get(`${API_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  approvePeminjaman: async (id) => {
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

  rejectPeminjaman: async (id) => {
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
