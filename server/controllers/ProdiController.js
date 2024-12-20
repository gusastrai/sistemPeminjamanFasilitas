const { Prodi } = require("../models");

const ProdiController = {
  getAllProdi: async (req, res) => {
    try {
      const prodis = await Prodi.findAll();
      res.status(200).json(prodis);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = ProdiController;
