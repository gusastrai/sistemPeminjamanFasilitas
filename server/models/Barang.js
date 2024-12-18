module.exports = (sequelize, DataTypes) => {
  const Barang = sequelize.define("Barang", {
    idBarang: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    namaBarang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jumlah: {
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
  });

  Barang.associate = (models) => {
    // Barang.hasMany(models.PeminjamanBarang, {
    //   foreignKey: "barangId",
    //   as: "peminjamanBarang",
    // });

    Barang.belongsToMany(models.Peminjaman, {
      through: models.PeminjamanBarang,
      foreignKey: "barangId",
      otherKey: "peminjamanId",
      as: "peminjaman",
    });
  };

  return Barang;
};
