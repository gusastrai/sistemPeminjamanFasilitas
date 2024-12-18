module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    idUser: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nomorInduk: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telepon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    prodiId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.belongsTo(models.Prodi, {
      foreignKey: "prodiId",
      as: "prodi",
    });

    User.hasMany(models.Peminjaman, {
      foreignKey: "userId",
      as: "peminjaman",
    });
  };

  return User;
};