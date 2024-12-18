const { User, Prodi } = require("../models");

const userManagementController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        include: {
          model: Prodi,
          as: "prodi",
          attributes: ["namaProdi"],
        },
      });
      res.status(200).json(users);
    } catch (error) {
      console.error("Error getting users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  updateUserStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.status = status;
      await user.save();

      res.status(200).json(user);
    } catch (error) {
      console.error("Error updating user status:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      await user.destroy();
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = userManagementController;