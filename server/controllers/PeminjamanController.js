const { stat } = require("fs");
const { PeminjamanRuangan, Peminjaman, Dokumen, Ruangan,Barang } = require("../models");
const path = require("path");

const PeminjamanController = {
  createPeminjamanRuangan: async (req, res) => {
    try {
      const { idUser, judulPeminjaman, tanggalSelesai, tanggalPeminjaman, idRuangan } = req.body;
      const ruangan = await Ruangan.findByPk(idRuangan);
      const peminjaman = await Peminjaman.create({
        userId: idUser,
        judulPeminjaman: judulPeminjaman,
        tanggalPeminjaman: tanggalPeminjaman,
        tanggalSelesai: tanggalSelesai,
        totalSewa: ruangan.hargaSewa,
      });
      const lastPeminjaman = await Peminjaman.findOne({
        order: [['idPeminjaman', 'DESC']],
      });
      const peminjamanRuangan = await PeminjamanRuangan.create({
        ruanganId: idRuangan,
        peminjamanId: lastPeminjaman.idPeminjaman,
      });


      res.status(201).json({ message: "Peminjaman berhasil diajukan", data: req.body });
    } catch (error) {
      console.error("Error creating peminjaman:", error);
      res.status(500).json({ message: error });
    }
  },
  createPeminjamanBarang: async (req, res) => {
    try {
      const { idUser, judulPeminjaman, tanggalSelesai, tanggalPeminjaman, idRuangan ,jumlah} = req.body;
      const barang = await Barang.findByPk(idBarang);
      const peminjaman = await Peminjaman.create({
        userId: idUser,
        judulPeminjaman: judulPeminjaman,
        tanggalPeminjaman: tanggalPeminjaman,
        tanggalSelesai: tanggalSelesai,
        totalSewa: jumlah * barang.hargaSewa,
      });
      const lastPeminjaman = await Peminjaman.findOne({
        order: [['idPeminjaman', 'DESC']],
      });
      const peminjamanBarang = await PeminjamanBarang.create({
        barangId: idRuangan,
        peminjamanId: lastPeminjaman.idPeminjaman,
        jumlahPeminjaman: jumlah,
      });


      res.status(201).json({ message: "Peminjaman berhasil diajukan", data: req.body });
    } catch (error) {
      console.error("Error creating peminjaman:", error);
      res.status(500).json({ message: error });
    }
  },
};

module.exports = PeminjamanController;