const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>{
  sequelize.define("Race",{
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lifeYears: {
      type: DataTypes.INTEGER,
    }
  },
  {
    timestamps: false,
  })
}
