const { DataTypes } = require('sequelize');
const db = require('../config/database');
const DailyPrice = db.define(
  'tdailyprice',
  {
    DailyPrice_ID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(10).UNSIGNED,
    },
    DailyPrice_PriceDate: { allowNull: false, type: DataTypes.DATEONLY },
    DailyPrice_TradeVolume: {
      type: DataTypes.STRING,
    },
    DailyPrice_Transaction: {
      type: DataTypes.STRING,
    },
    DailyPrice_TradeValue: {
      type: DataTypes.STRING,
    },
    DailyPrice_Open: { type: DataTypes.STRING },
    DailyPrice_High: { type: DataTypes.STRING },
    DailyPrice_Low: { type: DataTypes.STRING },
    DailyPrice_Close: { type: DataTypes.STRING },
    DailyPrice_Change: { type: DataTypes.STRING },
    DailyPrice_PriceEarningRatio: { type: DataTypes.STRING },
    DailyPrice_Create: { type: DataTypes.DATE },
    DailyPrice_Active: { type: DataTypes.DATE },
    DailyPrice_Delete: { type: DataTypes.DATE },
  },
  { tableName: 'tdailyprice' }
);
module.exports = DailyPrice;
