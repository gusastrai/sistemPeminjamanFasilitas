module.exports = (sequelize, DataTypes) => {
  const Prodi = sequelize.define('Prodi', {
    idProdi: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fakultasId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    namaProdi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Prodi.associate = (models) => {
    Prodi.hasMany(models.User, {
      foreignKey: 'prodiId',
      as: 'users',
    });

    Prodi.belongsTo(models.Fakultas, {
      foreignKey: 'fakultasId',
      as: 'fakultas',
    });
  };

  return Prodi;
};