const express = require("express");
const router = express.Router();
const gedungController = require("../controllers/gedungController");

// Get all gedung
router.get("/", gedungController.getAllGedung);

// Get gedung by id
router.get("/:id", gedungController.getGedungById);

// Create new gedung
router.post("/", gedungController.createGedung);

// Update gedung
router.put("/:id", gedungController.updateGedung);

// Delete gedung
router.delete("/:id", gedungController.deleteGedung);

module.exports = router;