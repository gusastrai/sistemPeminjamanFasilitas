module.exports = (sequelize, DataTypes) => {
  const PeminjamanRuangan = sequelize.define("PeminjamanRuangan", {
    idPeminjamanRuangan: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ruanganId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    peminjamanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  PeminjamanRuangan.associate = (models) => {
    PeminjamanRuangan.belongsTo(models.Peminjaman, {
      foreignKey: "peminjamanId",
      as: "peminjaman",
    });

    PeminjamanRuangan.belongsTo(models.Ruangan, {
      foreignKey: "ruanganId",
      as: "ruangan",
    });
  };

  return PeminjamanRuangan;
};
