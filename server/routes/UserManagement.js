const express = require("express");
const router = express.Router();
const userManagementController = require("../controllers/UserManagementController");

// Get all users
router.get("/all", userManagementController.getAllUsers);

// Update user status
router.put("/:id/status", userManagementController.updateUserStatus);

// Delete user
router.delete("/:id", userManagementController.deleteUser);

module.exports = router;