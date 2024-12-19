import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/peminjaman`; // Base URL

export const peminjamanService = {
  createPeminjamanRuangan: async (idRuangan, data) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token tidak ditemukan");
      }

      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      console.log("Decoded Token:", decodedToken);
      const idUser = decodedToken.id;

      if (!idUser) {
        throw new Error("idUser tidak ditemukan dalam token");
      }

      const requestData = {
        ...data,
        idUser,
        idRuangan,
      };
      
      const dataEntries = {};
      for (let pair of data.entries()) {
        console.log(pair[0] + ": " + pair[1]);
        dataEntries[pair[0]] = pair[1];
      }
      
      // Merge dataEntries into requestData
      const finalRequestData = {
        ...requestData,
        ...dataEntries
      };
      
      console.log("Request Data:", finalRequestData);
      const response = await axios.post(
        `${API_URL}/${idRuangan}`,
        finalRequestData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Response from server:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error saat membuat peminjaman ruangan:", error);
      throw error;
    }
  },
};
