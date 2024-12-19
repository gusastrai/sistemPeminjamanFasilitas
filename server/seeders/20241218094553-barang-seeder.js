'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Barangs",[
        {
          namaBarang: "proyektor",
          jumlah:10,
          hargaSewa:5000,
          createdAt: new Date(),
          updatedAt: new Date(),

        },
        {
          namaBarang: "camera",
          jumlah:5,
          hargaSewa:20000,
          createdAt: new Date(),
          updatedAt: new Date(),

        },
        {
          namaBarang: "kursi",
          jumlah:100,
          hargaSewa:1000,
          createdAt: new Date(),
          updatedAt: new Date(),

        },
        {
          namaBarang: "meja",
          jumlah:50,
          hargaSewa:2000,
          createdAt: new Date(),
          updatedAt: new Date(),

        },
        {
          namaBarang: "mobil",
          jumlah:5,
          hargaSewa:50000,
          createdAt: new Date(),
          updatedAt: new Date(),

        }
      ]
    )

  },

  async down (queryInterface, Sequelize) {
    
  }
};
