const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class MED extends Model {}

MED.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    med_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    med_detail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type_of_vaccin: {
      type: DataTypes.STRING,
    },
    made_by: {
      type: DataTypes.STRING,
    },
    approved_in: {
      type: DataTypes.STRING,
    },
    approval_source: {
      type: DataTypes.STRING,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'med',
  }
);

module.exports = MED;
