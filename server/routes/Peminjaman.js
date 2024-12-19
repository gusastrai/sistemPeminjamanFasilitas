const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const peminjamanController = require("../controllers/PeminjamanController");

// Create peminjaman
router.post("/:idRuangan", upload.single("lampiran"), peminjamanController.createPeminjamanRuangan);

// Get all peminjaman
router.get("/all", peminjamanController.getAllPeminjaman);

// Get peminjaman by user
router.get("/user/:userId", peminjamanController.getPeminjamanByUser);

// Get peminjaman by id
router.get("/:id", peminjamanController.getPeminjamanById);

// Approve peminjaman
router.put("/:id/approve", peminjamanController.approvePeminjaman);

// Reject peminjaman
router.put("/:id/reject", peminjamanController.rejectPeminjaman);

module.exports = router;