module.exports = (sequelize, DataTypes) => {
  const Peminjaman = sequelize.define("Peminjaman", {
    idPeminjaman: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    judulPeminjaman: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggalPeminjaman: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    waktuMulai: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    waktuSelesai: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    totalSewa: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  Peminjaman.associate = (models) => {
    Peminjaman.hasMany(models.Dokumen, {
      foreignKey: "peminjamanId",
      as: "dokumen",
    });

    Peminjaman.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });

    Peminjaman.belongsToMany(models.Barang, {
      through: models.PeminjamanBarang,
      foreignKey: "peminjamanId",
      otherKey: "barangId",
      as: "barang",
    });

    Peminjaman.belongsToMany(models.Ruangan, {
      through: models.PeminjamanRuangan,
      foreignKey: "peminjamanId",
      otherKey: "ruanganId",
      as: "ruangan",
    });
  };

  return Peminjaman;
};
