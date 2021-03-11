const { DataTypes } = require('sequelize');
const db = require('../config/database');
const tksecurtity_dailyprice = db.define(
  'tksecurtity_dailyprice',
  {
    SecurtityDailyPrice_ID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(10).UNSIGNED,
    },
    Security_ID: { allowNull: false, type: DataTypes.INTEGER(10).UNSIGNED },
    DailyPrice_ID: { allowNull: false, type: DataTypes.INTEGER(10).UNSIGNED },
    Security_DailyPrice_Create: { type: DataTypes.DATE },
    Security_DailyPrice_Active: { type: DataTypes.DATE },
    Security_DailyPrice_Delete: { type: DataTypes.DATE },
  },
  { tableName: 'tksecurtity_dailyprice' }
);
module.exports = tksecurtity_dailyprice;
