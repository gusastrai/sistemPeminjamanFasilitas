module.exports = (sequelize, DataTypes) => {
  const Fakultas = sequelize.define("Fakultas", {
    idFakultas: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    namaFakultas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Fakultas.associate = (models) => {
    Fakultas.hasMany(models.Prodi, {
      foreignKey: "fakultasId",
      as: "prodi",
    });
  };

  return Fakultas;
};
