const { Barang } = require("../models");

const barangController = {
  getAllBarang: async (req, res) => {
    try {
      const barangs = await Barang.findAll();
      res.status(200).json(barangs);
    } catch (error) {
      console.error("Error getting barang:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  createBarang: async (req, res) => {
    try {
      const { namaBarang, jumlah, hargaSewa } = req.body;

      if (!namaBarang || !jumlah) {
        return res.status(400).json({
          message: "Nama barang and jumlah are required",
        });
      }

      const newBarang = await Barang.create({
        namaBarang,
        jumlah,
        hargaSewa,
      });

      res.status(201).json(newBarang);
    } catch (error) {
      console.error("Error creating barang:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  updateBarang: async (req, res) => {
    try {
      const { id } = req.params;
      const { namaBarang, jumlah, hargaSewa } = req.body;

      const barang = await Barang.findByPk(id);
      if (!barang) {
        return res.status(404).json({ message: "Barang not found" });
      }

      await barang.update({
        namaBarang: namaBarang || barang.namaBarang,
        jumlah: jumlah || barang.jumlah,
        hargaSewa: hargaSewa || barang.hargaSewa,
      });

      res.status(200).json(barang);
    } catch (error) {
      console.error("Error updating barang:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  deleteBarang: async (req, res) => {
    try {
      const { id } = req.params;

      const barang = await Barang.findByPk(id);
      if (!barang) {
        return res.status(404).json({ message: "Barang not found" });
      }

      await barang.destroy();
      res.status(200).json({ message: "Barang deleted successfully" });
    } catch (error) {
      console.error("Error deleting barang:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = barangController;
