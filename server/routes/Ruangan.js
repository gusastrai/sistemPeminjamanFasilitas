const express = require("express");
const router = express.Router();
const ruanganController = require("../controllers/RuanganController");

// Get all ruangan
router.get("/", ruanganController.getAllRuangan);

// Get ruangan by id
router.get("/:id", ruanganController.getRuanganById);

// Get ruangan by gedung id
router.get("/gedung/:gedungId", ruanganController.getRuanganByGedungId);

// Create new ruangan
router.post("/", ruanganController.createRuangan);

// Update ruangan
router.put("/:id", ruanganController.updateRuangan);

// Delete ruangan
router.delete("/:id", ruanganController.deleteRuangan);

module.exports = router;
