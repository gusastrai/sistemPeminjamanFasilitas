const { Gedung } = require("../models");

const gedungController = {
  // Get all gedung
  getAllGedung: async (req, res) => {
    try {
      const gedungs = await Gedung.findAll();
      res.status(200).json(gedungs);
    } catch (error) {
      console.error("Error getting gedungs:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Get gedung by id
  getGedungById: async (req, res) => {
    try {
      const gedung = await Gedung.findByPk(req.params.id);
      if (!gedung) {
        return res.status(404).json({ message: "Gedung not found" });
      }
      res.status(200).json(gedung);
    } catch (error) {
      console.error("Error getting gedung:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Create new gedung
  createGedung: async (req, res) => {
    try {
      const { namaGedung } = req.body;

      if (!namaGedung) {
        return res.status(400).json({ message: "Nama gedung is required" });
      }

      const newGedung = await Gedung.create({
        namaGedung,
      });

      res.status(201).json(newGedung);
    } catch (error) {
      console.error("Error creating gedung:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Update gedung
  updateGedung: async (req, res) => {
    try {
      const { namaGedung } = req.body;
      const gedung = await Gedung.findByPk(req.params.id);

      if (!gedung) {
        return res.status(404).json({ message: "Gedung not found" });
      }

      await gedung.update({
        namaGedung: namaGedung || gedung.namaGedung,
      });

      res.status(200).json(gedung);
    } catch (error) {
      console.error("Error updating gedung:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Delete gedung
  deleteGedung: async (req, res) => {
    try {
      const gedung = await Gedung.findByPk(req.params.id);

      if (!gedung) {
        return res.status(404).json({ message: "Gedung not found" });
      }

      await gedung.destroy();

      res.status(200).json({ message: "Gedung deleted successfully" });
    } catch (error) {
      console.error("Error deleting gedung:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = gedungController;