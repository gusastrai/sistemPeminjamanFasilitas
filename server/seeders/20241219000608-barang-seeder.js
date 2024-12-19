'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Barangs', [
      {
        namaBarang: 'Proyektor',
        jumlah: 10,
        hargaSewa: '50000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        namaBarang: 'Laptop',
        jumlah: 5,
        hargaSewa: '100000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        namaBarang: 'Microphone',
        jumlah: 8,
        hargaSewa: '25000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        namaBarang: 'Speaker',
        jumlah: 6,
        hargaSewa: '75000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        namaBarang: 'Kamera',
        jumlah: 3,
        hargaSewa: '150000',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Barangs', null, {});
  }
};