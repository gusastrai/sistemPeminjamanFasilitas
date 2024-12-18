"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("password123", 10);

    const prodiTI = await queryInterface.rawSelect('Prodis', {
      where: {
        namaProdi: 'Teknik Informatika',
      },
    }, 'idProdi');

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          nomorInduk: "198303052006042002",
          nama: "Dosen A",
          email: "dosen@gmail.com",
          password: hashedPassword,
          telepon: "081234567890",
          role: "dosen",
          status: true,
          prodiId: prodiTI,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nomorInduk: "220411100081",
          nama: "Bagus Satria Putra Anugrah",
          email: "bagus123@gmail.com",
          password: hashedPassword,
          telepon: "081298765432",
          role: "mahasiswa",
          status: true,
          prodiId: prodiTI,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "Users",
      { role: ["dosen", "mahasiswa"] },
      {}
    );
  },
};