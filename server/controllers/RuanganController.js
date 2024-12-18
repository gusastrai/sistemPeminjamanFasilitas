const { Ruangan, Gedung } = require("../models");

const ruanganController = {
  // Get all ruangan
  getAllRuangan: async (req, res) => {
    try {
      const ruangans = await Ruangan.findAll({
        include: [{
          model: Gedung,
          as: 'gedung'
        }]
      });
      res.status(200).json(ruangans);
    } catch (error) {
      console.error("Error getting ruangans:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Get ruangan by id
  getRuanganById: async (req, res) => {
    try {
      const ruangan = await Ruangan.findByPk(req.params.id, {
        include: [{
          model: Gedung,
          as: 'gedung'
        }]
      });
      if (!ruangan) {
        return res.status(404).json({ message: "Ruangan not found" });
      }
      res.status(200).json(ruangan);
    } catch (error) {
      console.error("Error getting ruangan:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Get ruangan by gedung id
  getRuanganByGedungId: async (req, res) => {
    try {
      const ruangans = await Ruangan.findAll({
        where: { gedungId: req.params.gedungId },
        include: [{
          model: Gedung,
          as: 'gedung'
        }]
      });
      res.status(200).json(ruangans);
    } catch (error) {
      console.error("Error getting ruangans:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Create new ruangan
  createRuangan: async (req, res) => {
    try {
      const { gedungId, namaRuangan, kapasitas, hargaSewa, status } = req.body;

      // Validate required fields
      if (!gedungId || !namaRuangan || !kapasitas) {
        return res.status(400).json({ 
          message: "GedungId, nama ruangan, and kapasitas are required" 
        });
      }

      const newRuangan = await Ruangan.create({
        gedungId,
        namaRuangan,
        kapasitas,
        hargaSewa,
        status: status !== undefined ? status : true
      });

      res.status(201).json(newRuangan);
    } catch (error) {
      console.error("Error creating ruangan:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Update ruangan
  updateRuangan: async (req, res) => {
    try {
      const ruangan = await Ruangan.findByPk(req.params.id);

      if (!ruangan) {
        return res.status(404).json({ message: "Ruangan not found" });
      }

      const { gedungId, namaRuangan, kapasitas, hargaSewa, status } = req.body;

      await ruangan.update({
        gedungId: gedungId || ruangan.gedungId,
        namaRuangan: namaRuangan || ruangan.namaRuangan,
        kapasitas: kapasitas || ruangan.kapasitas,
        hargaSewa: hargaSewa || ruangan.hargaSewa,
        status: status !== undefined ? status : ruangan.status
      });

      res.status(200).json(ruangan);
    } catch (error) {
      console.error("Error updating ruangan:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Delete ruangan
  deleteRuangan: async (req, res) => {
    try {
      const ruangan = await Ruangan.findByPk(req.params.id);

      if (!ruangan) {
        return res.status(404).json({ message: "Ruangan not found" });
      }

      await ruangan.destroy();

      res.status(200).json({ message: "Ruangan deleted successfully" });
    } catch (error) {
      console.error("Error deleting ruangan:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = ruanganController;