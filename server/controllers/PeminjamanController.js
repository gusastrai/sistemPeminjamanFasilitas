const { PeminjamanRuangan } = require("../models");
const path = require("path");

const PeminjamanController = {
  createPeminjamanRuangan: async (req, res) => {
    try {
      const { tanggal, waktuMulai, waktuSelesai } = req.body;
      const gambar = req.file;  // Ambil gambar yang diunggah

      if (!tanggal || !waktuMulai || !waktuSelesai || !gambar) {
        return res.status(400).json({ message: "Semua kolom harus diisi!" });
      }

      // Simpan gambar dan ambil path-nya
      const gambarPath = path.join(__dirname, "..", "uploads", gambar.filename);

      // Simpan pengajuan peminjaman ke database
      const peminjaman = await PeminjamanRuangan.create({
        idRuangan: req.params.idRuangan,
        tanggal,
        waktuMulai,
        waktuSelesai,
        gambarPath, // Menyimpan path gambar di database
      });

      res.status(201).json({ message: "Peminjaman berhasil diajukan", peminjaman });
    } catch (error) {
      console.error("Error creating peminjaman:", error);
      res.status(500).json({ message: "Terjadi kesalahan saat memproses peminjaman" });
    }
  },
};

module.exports = PeminjamanController;
