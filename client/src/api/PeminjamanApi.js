import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/peminjaman`; // Base URL

export const peminjamanService = {
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
  getAllPeminjaman: async (req, res) => {
    try {
      const peminjamans = await Peminjaman.findAll({
        include: [
          {
            model: User,
            as: "user",
            attributes: ["nama", "nomorInduk", "email"]
          },
          {
            model: PeminjamanRuangan,
            as: "peminjamanRuangan",
            include: [
              {
                model: Ruangan,
                as: "ruangan"
              }
            ]
          },
          {
            model: Dokumen,
            as: "dokumen"
          }
        ]
      });

      res.status(200).json(peminjamans);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
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
      throw error;
    }
  },

  getPeminjamanById: async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
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
      throw error;
    }
  },
};
