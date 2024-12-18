module.exports = (sequelize, DataTypes) => {
  const Dokumen = sequelize.define("Dokumen", {
    idDokumen: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    peminjamanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    judulLampiran: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lampiran: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Dokumen.associate = (models) => {
    Dokumen.belongsTo(models.Peminjaman, {
      foreignKey: "peminjamanId",
      as: "peminjaman",
    });
  };

  return Dokumen;
};
