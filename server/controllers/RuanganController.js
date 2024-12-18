const { Ruangan, Gedung } = require("../models");

const ruanganController = {
  // Get all ruangan beserta informasi gedung
  getAllRuangan: async (req, res) => {
    try {
      // Mengambil semua data ruangan beserta informasi gedung terkait
      const ruangans = await Ruangan.findAll({
        include: {
          model: Gedung,  // Menyertakan model Gedung dalam hasil query
          as: 'gedung',   // Alias untuk relasi (sesuaikan dengan relasi di model)
        },
      });
      res.status(200).json(ruangans);
    } catch (error) {
      console.error("Error getting ruangans:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = ruanganController;
