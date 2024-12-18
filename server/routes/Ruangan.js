const express = require("express");
const router = express.Router();
const ruanganController = require("../controllers/RuanganController");

// Get all gedung
router.get("/", ruanganController.getAllRuangan);


module.exports = router;