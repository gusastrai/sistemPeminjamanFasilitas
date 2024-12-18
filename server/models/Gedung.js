module.exports = (sequelize, DataTypes) => {
  const Gedung = sequelize.define("Gedung", {
    idGedung: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    namaGedung: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Gedung.associate = (models) => {
    Gedung.hasMany(models.Ruangan, {
      foreignKey: "gedungId",
      as: "ruangan",
    });
  };

  return Gedung;
};
