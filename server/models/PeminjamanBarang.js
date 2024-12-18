module.exports = (sequelize, DataTypes) => {
  const PeminjamanBarang = sequelize.define("PeminjamanBarang", {
    idPeminjamanBarang: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    barangId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    peminjamanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jumlahPeminjaman: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  PeminjamanBarang.associate = (models) => {
    PeminjamanBarang.belongsTo(models.Peminjaman, {
      foreignKey: "peminjamanId",
      as: "peminjaman",
    });
    
    PeminjamanBarang.belongsTo(models.Barang, {
      foreignKey: "barangId",
      as: "barang",
    });
  };

  return PeminjamanBarang;
};
