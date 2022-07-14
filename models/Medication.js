const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class medication extends Model {

}

medication.init(
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
    med_descrip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
   med_generic_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    med_dozes:{
      
    },
    med_dozes_frequency:{

    },
    

  },
  {
   

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'medication',
  }
);

module.exports = medication;