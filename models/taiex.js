const { DataTypes } = require('sequelize');
const db = require('../config/database');
const taiex = db.define(
  'taiex',
  {
    taiex_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    open: {
      type: DataTypes.DECIMAL(7, 2),
      allowNull: true,
    },
    high: {
      type: DataTypes.DECIMAL(7, 2),
      allowNull: true,
    },
    low: {
      type: DataTypes.DECIMAL(7, 2),
      allowNull: true,
    },
    close: {
      type: DataTypes.DECIMAL(7, 2),
      allowNull: true,
    },
    adj_Close: {
      type: DataTypes.DECIMAL(7, 2),
      allowNull: true,
    },
    volume: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { tableName: 'taiex' }
);
module.exports = taiex;
