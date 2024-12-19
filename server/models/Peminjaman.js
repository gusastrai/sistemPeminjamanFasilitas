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
    tanggalSelesai: {
      type: DataTypes.DATE,
      allowNull: false,
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

    Peminjaman.hasOne(models.PeminjamanRuangan, {
      foreignKey: "peminjamanId",
      as: "peminjamanRuangan",
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
