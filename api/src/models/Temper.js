const { DataTypes } = require("sequelize");

moodule.exports = (sequelize) => {
  sequelize.define(
    "Temper",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
