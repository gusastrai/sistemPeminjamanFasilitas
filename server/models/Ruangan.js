module.exports = (sequelize, DataTypes) => {
  const Ruangan = sequelize.define("Ruangan", {
    idRuangan: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    gedungId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    namaRuangan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kapasitas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hargaSewa: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gambar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });

  Ruangan.associate = (models) => {
    Ruangan.belongsTo(models.Gedung, {
      foreignKey: "gedungId",
      as: "gedung",
    });

    Ruangan.belongsToMany(models.Peminjaman, {
      through: models.PeminjamanRuangan,
      foreignKey: "ruanganId",
      otherKey: "peminjamanId",
      as: "peminjaman",
    });
  };

  return Ruangan;
};
