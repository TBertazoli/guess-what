const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Results extends Model {}

Results.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  results: {
    type: DataTypes.ARRAY,
    allowNull: false,
  },
});
