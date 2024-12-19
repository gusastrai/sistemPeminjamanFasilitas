const express = require("express");
const router = express.Router();
const barangController = require("../controllers/BarangController");

// Get all gedung
router.get("/", barangController.getAllBarang);

module.exports = router;