import express from "express";
import multer from "multer";
import peminjamanController from "../controllers/PeminjamanController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });
// Get all gedung
router.post("/:idRuangan", upload.single('gambar'), peminjamanController.createPeminjamanRuangan);
router.post("/:idBarang", upload.single('lampiran'), peminjamanController.createPeminjamanBarang);
export default router;