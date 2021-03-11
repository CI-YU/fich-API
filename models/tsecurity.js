const { DataTypes } = require('sequelize');
const db = require('../config/database');
const tsecurity = db.define(
  'tsecurity',
  {
    Security_ID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(10).UNSIGNED,
    },
    Security_Ticker: { allowNull: false, type: DataTypes.STRING },
    Security_Name: { allowNull: false, type: DataTypes.STRING },
    Security_Industry: { type: DataTypes.STRING },
    Security_Sector: { type: DataTypes.STRING },
    Security_Create: { type: DataTypes.DATE },
    Security_Active: { type: DataTypes.DATE },
    Security_Delete: { type: DataTypes.DATE },
  },
  { tableName: 'tsecurity' }
);
module.exports = tsecurity;
