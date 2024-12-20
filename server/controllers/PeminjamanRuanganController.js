const {
  PeminjamanRuangan,
  Peminjaman,
  Dokumen,
  Ruangan,
  User,
  Gedung,
} = require("../models");
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");

const PeminjamanRuanganController = {
  createPeminjamanRuangan: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "File lampiran required" });
      }
  
      const { idUser, judulPeminjaman, tanggalPeminjaman, tanggalSelesai } = req.body;
      const idRuangan = req.params.idRuangan;
  
      const startDate = new Date(tanggalPeminjaman);
      const endDate = new Date(tanggalSelesai);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      if (startDate >= endDate) {
        return res.status(400).json({
          message: "Tanggal selesai harus lebih besar dari tanggal mulai"
        });
      }
  
      if (startDate < today) {
        return res.status(400).json({
          message: "Tanggal peminjaman tidak boleh kurang dari hari ini"
        });
      }
  
      const maxDuration = 7 * 24 * 60 * 60 * 1000; 
      if (endDate - startDate > maxDuration) {
        return res.status(400).json({
          message: "Maksimal durasi peminjaman adalah 7 hari"
        });
      }
  
      const existingBooking = await Peminjaman.findOne({
        where: {
          status: true,
        },
        include: [{
          model: PeminjamanRuangan,
          as: "peminjamanRuangan",
          where: { ruanganId: idRuangan },
          required: true
        }],
        where: {
          [Op.or]: [
            {
              [Op.and]: [
                { tanggalPeminjaman: { [Op.lte]: tanggalSelesai } },
                { tanggalSelesai: { [Op.gte]: tanggalPeminjaman } }
              ]
            }
          ]
        }
      });
  
      if (existingBooking) {
        return res.status(400).json({
          message: "Ruangan sudah dipinjam pada periode yang dipilih"
        });
      }
  
      const pendingBookings = await Peminjaman.count({
        where: {
          userId: idUser,
          status: false
        }
      });
  
      if (pendingBookings >= 3) {
        return res.status(400).json({
          message: "Anda memiliki terlalu banyak pengajuan peminjaman yang pending"
        });
      }
  
      const uploadDir = path.join(__dirname, "../uploads");
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
        data: { peminjaman, dokumen },
      });
  
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
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
            required: true,
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
            attributes: ["nama", "nomorInduk", "email"],
          },
          {
            model: PeminjamanRuangan,
            as: "peminjamanRuangan",
            required: true,
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

  getPeminjamanById: async (req, res) => {
    try {
      const { id } = req.params;
      const peminjaman = await Peminjaman.findByPk(id, {
        include: [
          {
            model: User,
            as: "user",
            attributes: ["nama", "nomorInduk", "email", "telepon"],
          },
          {
            model: PeminjamanRuangan,
            as: "peminjamanRuangan",
            include: [
              {
                model: Ruangan,
                as: "ruangan",
                include: [
                  {
                    model: Gedung,
                    as: "gedung",
                    attributes: ["namaGedung"],
                  },
                ],
              },
            ],
          },
          {
            model: Dokumen,
            as: "dokumen",
          },
        ],
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
      const peminjaman = await Peminjaman.findByPk(id, {
        include: [
          {
            model: Dokumen,
            as: "dokumen",
          },
        ],
      });

      if (!peminjaman) {
        return res.status(404).json({ message: "Peminjaman not found" });
      }

      if (peminjaman.dokumen && peminjaman.dokumen.length > 0) {
        for (const doc of peminjaman.dokumen) {
          const filePath = path.join(__dirname, "..", doc.lampiran);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
          await doc.destroy();
        }
      }

      await peminjaman.destroy();

      res.status(200).json({
        message: "Peminjaman rejected and deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getAllPeminjamanRuanganAcc: async (req, res) => {
    try {
      const peminjamans = await Peminjaman.findAll({
        where: { status: true },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["nama", "nomorInduk", "email"],
          },
          {
            model: PeminjamanRuangan,
            as: "peminjamanRuangan",
            required: true,
            include: [
              {
                model: Ruangan,
                as: "ruangan",
                include: [
                  {
                    model: Gedung,
                    as: "gedung",
                    attributes: ["namaGedung"],
                  },
                ],
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

  getPeminjamanByUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const peminjamans = await Peminjaman.findAll({
        where: { userId },
        include: [
          {
            model: PeminjamanRuangan,
            as: "peminjamanRuangan",
            required: true,
            include: [
              {
                model: Ruangan,
                as: "ruangan",
                include: [
                  {
                    model: Gedung,
                    as: "gedung",
                    attributes: ["namaGedung"],
                  },
                ],
              },
            ],
          },
          {
            model: Dokumen,
            as: "dokumen",
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      res.status(200).json(peminjamans);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = PeminjamanRuanganController;
