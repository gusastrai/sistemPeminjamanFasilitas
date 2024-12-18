'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Fakultas', [
      {
        namaFakultas: 'Fakultas Teknik',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        namaFakultas: 'Fakultas Ekonomi',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        namaFakultas: 'Fakultas Ilmu Komputer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        namaFakultas: 'Fakultas Hukum',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        namaFakultas: 'Fakultas Kedokteran',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Fakultas', null, {});
  }
};