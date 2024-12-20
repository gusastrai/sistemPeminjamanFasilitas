const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const peminjamanBarangController = require("../controllers/PeminjamanBarangController");

// Create peminjaman barang
router.post(
  "/:idBarang",
  upload.single("lampiran"),
  peminjamanBarangController.createPeminjamanBarang
);

// Get all peminjaman barang
router.get("/all", peminjamanBarangController.getAllPeminjamanBarang);

router.get("/accepted", peminjamanBarangController.getAllPeminjamanBarangAcc);

// Get peminjaman by user
router.get("/user/:userId", peminjamanBarangController.getPeminjamanByUser);

// Get peminjaman by id
router.get("/:id", peminjamanBarangController.getPeminjamanBarangById);

// Approve peminjaman
router.put("/:id/approve", peminjamanBarangController.approvePeminjamanBarang);

// Reject peminjaman
router.put("/:id/reject", peminjamanBarangController.rejectPeminjamanBarang);

module.exports = router;
