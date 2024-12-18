const express = require("express");
const router = express.Router();
const multer = require("multer");
const peminjamanController = require("../controllers/PeminjamanController");

const upload = multer({ dest: "uploads/" });
// Get all gedung
router.post("/:idRuangan",upload.single('gambar'), peminjamanController.createPeminjamanRuangan);


module.exports = router;