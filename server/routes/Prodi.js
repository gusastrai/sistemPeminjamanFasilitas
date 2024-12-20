const express = require("express");
const router = express.Router();
const prodiController = require("../controllers/ProdiController");

router.get("/", prodiController.getAllProdi);

module.exports = router;