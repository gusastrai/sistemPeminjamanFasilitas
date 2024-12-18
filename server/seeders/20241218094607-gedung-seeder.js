"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Gedungs",
      [
        {
          namaGedung: "RKBF",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          namaGedung: "Laboratorium Teknik",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Gedungs", { namaGedung: "RKBF", namaGedung: "Laboratorium Teknik" }, {});
  },
};
