const express = require("express");
const router = express.Router();
const barangController = require("../controllers/BarangController");

// Get all barang
router.get("/", barangController.getAllBarang);

// Create new barang
router.post("/", barangController.createBarang);

// Update barang
router.put("/:id", barangController.updateBarang);

// Delete barang
router.delete("/:id", barangController.deleteBarang);

module.exports = router;
