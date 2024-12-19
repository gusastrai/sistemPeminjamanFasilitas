const { PeminjamanRuangan, Peminjaman, Dokumen, Ruangan, User } = require("../models");
const path = require("path");
const fs = require("fs");

const PeminjamanController = {
  createPeminjamanRuangan: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "File lampiran required" });
      }
  
      const { idUser, judulPeminjaman, tanggalPeminjaman, tanggalSelesai } = req.body;
      const idRuangan = req.params.idRuangan;
  
      const uploadDir = path.join(__dirname, '../uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
  
      const ruangan = await Ruangan.findByPk(idRuangan);
      
      const peminjaman = await Peminjaman.create({
        userId: idUser,
        judulPeminjaman,
        tanggalPeminjaman,
        tanggalSelesai,
        totalSewa: ruangan.hargaSewa,
      });
  
      await PeminjamanRuangan.create({
        ruanganId: idRuangan,
        peminjamanId: peminjaman.idPeminjaman,
      });
  
      const fileUrl = `/uploads/${req.file.filename}`;
      const dokumen = await Dokumen.create({
        peminjamanId: peminjaman.idPeminjaman,
        lampiran: fileUrl,
      });
  
      res.status(201).json({
        message: "Peminjaman berhasil diajukan",
        data: { peminjaman, dokumen }
      });
  
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ 
        message: "Internal server error",
        error: error.message 
      });
    }
  },

  getPeminjamanByUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const peminjamans = await Peminjaman.findAll({
        where: { userId },
        include: [
          {
            model: PeminjamanRuangan,
            as: "peminjamanRuangan",
            include: [
              {
                model: Ruangan,
                as: "ruangan",
              },
            ],
          },
          {
            model: Dokumen,
            as: "dokumen",
          },
        ],
      });

      res.status(200).json(peminjamans);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
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

  getPeminjamanById: async (req, res) => {
    try {
      const { id } = req.params;
      const peminjaman = await Peminjaman.findByPk(id, {
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

      if (!peminjaman) {
        return res.status(404).json({ message: "Peminjaman not found" });
      }

      res.status(200).json(peminjaman);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  approvePeminjaman: async (req, res) => {
    try {
      const { id } = req.params;
      const peminjaman = await Peminjaman.findByPk(id);

      if (!peminjaman) {
        return res.status(404).json({ message: "Peminjaman not found" });
      }

      await peminjaman.update({ status: true });
      res.status(200).json({ message: "Peminjaman approved successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  rejectPeminjaman: async (req, res) => {
    try {
      const { id } = req.params;
      const peminjaman = await Peminjaman.findByPk(id);

      if (!peminjaman) {
        return res.status(404).json({ message: "Peminjaman not found" });
      }

      await peminjaman.destroy();
      res.status(200).json({ message: "Peminjaman rejected and deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = PeminjamanController;
