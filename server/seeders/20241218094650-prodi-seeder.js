'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Find the Fakultas Teknik ID
    const fakultasTeknik = await queryInterface.rawSelect('Fakultas', {
      where: {
        namaFakultas: 'Fakultas Teknik',
      },
    }, 'idFakultas');

    if (!fakultasTeknik) {
      throw new Error('Fakultas Teknik not found');
    }

    await queryInterface.bulkInsert('Prodis', [
      {
        namaProdi: 'Teknik Informatika',
        fakultasId: fakultasTeknik,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        namaProdi: 'Teknik Mesin',
        fakultasId: fakultasTeknik,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        namaProdi: 'Teknik Elektro',
        fakultasId: fakultasTeknik,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        namaProdi: 'Teknik Mekatronika',
        fakultasId: fakultasTeknik,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        namaProdi: 'Teknik Industri',
        fakultasId: fakultasTeknik,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        namaProdi: 'Sistem Informasi',
        fakultasId: fakultasTeknik,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    const fakultasTeknik = await queryInterface.rawSelect('Fakultas', {
      where: {
        namaFakultas: 'Fakultas Teknik',
      },
    }, 'idFakultas');

    await queryInterface.bulkDelete('Prodis', { fakultasId: fakultasTeknik }, {});
  }
};