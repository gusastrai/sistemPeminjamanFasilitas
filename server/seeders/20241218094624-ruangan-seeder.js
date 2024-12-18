'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Find the Gedung ID for Laboratorium Teknik
    const gedungLaboratorium = await queryInterface.rawSelect('Gedungs', {
      where: {
        namaGedung: 'Laboratorium Teknik',
      },
    }, 'idGedung');

    if (!gedungLaboratorium) {
      throw new Error('Gedung Laboratorium Teknik not found');
    }

    await queryInterface.bulkInsert('Ruangans', [
      {
        namaRuangan: 'Lab. TIA',
        gedungId: gedungLaboratorium,
        kapasitas: 30,
        hargaSewa: '100000',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        namaRuangan: 'Lab. CC',
        gedungId: gedungLaboratorium,
        kapasitas: 30,
        hargaSewa: '100000',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        namaRuangan: 'Lab. Sister',
        gedungId: gedungLaboratorium,
        kapasitas: 30,
        hargaSewa: '100000',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        namaRuangan: 'Lab. Riset',
        gedungId: gedungLaboratorium,
        kapasitas: 30,
        hargaSewa: '100000',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        namaRuangan: 'Lab. TMJ',
        gedungId: gedungLaboratorium,
        kapasitas: 30,
        hargaSewa: '100000',
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Find the Gedung ID for Laboratorium Teknik
    const gedungLaboratorium = await queryInterface.rawSelect('Gedungs', {
      where: {
        namaGedung: 'Laboratorium Teknik',
      },
    }, 'idGedung');

    await queryInterface.bulkDelete('Ruangans', { gedungId: gedungLaboratorium }, {});
  }
};