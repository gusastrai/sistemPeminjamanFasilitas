const { Admin, Fakultas } = require("../models");
const bcrypt = require("bcrypt");

const adminManagementController = {
  getAllAdmins: async (req, res) => {
    try {
      const admins = await Admin.findAll({
        where: { role: "admin fakultas" },
        attributes: { exclude: ["password"] },
      });
      res.status(200).json(admins);
    } catch (error) {
      console.error("Error getting admins:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  createAdmin: async (req, res) => {
    try {
      const { username, email, password, role } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({
          message: "Username, email and password are required",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newAdmin = await Admin.create({
        username,
        email,
        password: hashedPassword,
        role: "admin fakultas",
      });

      const adminWithoutPassword = {
        idAdmin: newAdmin.idAdmin,
        username: newAdmin.username,
        email: newAdmin.email,
        role: newAdmin.role,
      };

      res.status(201).json(adminWithoutPassword);
    } catch (error) {
      console.error("Error creating admin:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  deleteAdmin: async (req, res) => {
    try {
      const { id } = req.params;

      const admin = await Admin.findByPk(id);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      await admin.destroy();
      res.status(200).json({ message: "Admin deleted successfully" });
    } catch (error) {
      console.error("Error deleting admin:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = adminManagementController;
