"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await queryInterface.bulkInsert(
      "Admins",
      [
        {
          username: "Admin Fakultas",
          email: "adminfakultas@gmail.com",
          password: hashedPassword,
          role: "admin fakultas",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "Admin Universitas",
          email: "adminuniversitas@gmail.com",
          password: hashedPassword,
          role: "admin universitas",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "Admins",
      { role: ["admin fakultas", "admin universitas"] },
      {}
    );
  },
};
