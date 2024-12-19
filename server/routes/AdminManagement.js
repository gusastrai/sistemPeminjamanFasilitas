const express = require("express");
const router = express.Router();
const adminManagementController = require("../controllers/AdminManagementController");

// Get all admins
router.get("/all", adminManagementController.getAllAdmins);

// Create new admin
router.post("/", adminManagementController.createAdmin);

// Delete admin
router.delete("/:id", adminManagementController.deleteAdmin);

module.exports = router;
