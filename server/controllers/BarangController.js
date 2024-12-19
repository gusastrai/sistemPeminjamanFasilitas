const { Barang} = require("../models");

const barangController = {
  // Get all ruangan
  getAllBarang: async (req, res) => {
    try {
      const barangs = await Barang.findAll();
      res.status(200).json(barangs);
    } catch (error) {
      console.error("Error getting barangs:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
}
module.exports = barangController;