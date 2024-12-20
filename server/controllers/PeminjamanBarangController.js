const {
  PeminjamanBarang,
  Peminjaman,
  Dokumen,
  Barang,
  User,
} = require("../models");
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");

const PeminjamanBarangController = {
  createPeminjamanBarang: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "File lampiran required" });
      }

      const {
        judulPeminjaman,
        jumlahPeminjaman,
        tanggalPeminjaman,
        tanggalSelesai,
        idUser,
      } = req.body;
      const idBarang = req.params.idBarang;

      const startDate = new Date(tanggalPeminjaman);
      const endDate = new Date(tanggalSelesai);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (startDate >= endDate) {
        return res.status(400).json({
          message: "Tanggal selesai harus lebih besar dari tanggal mulai",
        });
      }

      if (startDate < today) {
        return res.status(400).json({
          message: "Tanggal peminjaman tidak boleh kurang dari hari ini",
        });
      }

      const maxDuration = 7 * 24 * 60 * 60 * 1000; 
      if (endDate - startDate > maxDuration) {
        return res.status(400).json({
          message: "Maksimal durasi peminjaman adalah 7 hari",
        });
      }

      const barang = await Barang.findByPk(idBarang);
      if (!barang) {
        return res.status(404).json({ message: "Barang not found" });
      }

      const existingBookings = await Peminjaman.findAll({
        where: {
          status: true,
          [Op.or]: [
            {
              [Op.and]: [
                { tanggalPeminjaman: { [Op.lte]: tanggalSelesai } },
                { tanggalSelesai: { [Op.gte]: tanggalPeminjaman } },
              ],
            },
          ],
        },
        include: [
          {
            model: PeminjamanBarang,
            as: "peminjamanBarang",
            where: { barangId: idBarang },
            required: true,
          },
        ],
      });

      const bookedQuantity = existingBookings.reduce((total, booking) => {
        return total + booking.peminjamanBarang.jumlahPeminjaman;
      }, 0);

      if (barang.jumlah - bookedQuantity < jumlahPeminjaman) {
        return res.status(400).json({
          message: "Stok barang tidak mencukupi untuk periode yang dipilih",
        });
      }

      const pendingBookings = await Peminjaman.count({
        where: {
          userId: idUser,
          status: false,
        },
      });

      if (pendingBookings >= 3) {
        return res.status(400).json({
          message:
            "Anda memiliki terlalu banyak pengajuan peminjaman yang pending",
        });
      }

      const uploadDir = path.join(__dirname, "../uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const peminjaman = await Peminjaman.create({
        userId: idUser,
        judulPeminjaman,
        tanggalPeminjaman,
        tanggalSelesai,
        totalSewa: barang.hargaSewa * jumlahPeminjaman,
      });

      await PeminjamanBarang.create({
        barangId: idBarang,
        peminjamanId: peminjaman.idPeminjaman,
        jumlahPeminjaman,
      });

      const fileUrl = `/uploads/${req.file.filename}`;
      await Dokumen.create({
        peminjamanId: peminjaman.idPeminjaman,
        lampiran: fileUrl,
      });

      res.status(201).json({
        message: "Peminjaman berhasil diajukan",
        data: peminjaman,
      });
    } catch (error) {
      console.error("Error:", error);
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
            required: true,
            model: PeminjamanBarang,
            as: "peminjamanBarang",
            include: [{ model: Barang, as: "barang" }],
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

  getAllPeminjamanBarang: async (req, res) => {
    try {
      const peminjamans = await Peminjaman.findAll({
        include: [
          {
            model: User,
            as: "user",
            attributes: ["nama", "nomorInduk", "email"],
          },
          {
            model: PeminjamanBarang,
            as: "peminjamanBarang",
            required: true,
            include: [
              {
                model: Barang,
                as: "barang",
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

  getPeminjamanBarangById: async (req, res) => {
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
            model: PeminjamanBarang,
            as: "peminjamanBarang",
            include: [
              {
                model: Barang,
                as: "barang",
              },
            ],
          },
          {
            model: Dokumen,
            as: "dokumen",
          },
        ],
      });

      res.status(200).json(peminjaman);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  approvePeminjamanBarang: async (req, res) => {
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

  rejectPeminjamanBarang: async (req, res) => {
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

  getAllPeminjamanBarangAcc: async (req, res) => {
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
            model: PeminjamanBarang,
            as: "peminjamanBarang",
            required: true,
            include: [
              {
                model: Barang,
                as: "barang",
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
};

module.exports = PeminjamanBarangController;
