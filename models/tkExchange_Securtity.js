const { DataTypes } = require('sequelize');
const db = require('../config/database');
const tkexchange_securtity = db.define(
  'tkexchange_securtity',
  {
    Exchange_ID: {
      allowNull: false,
      type: DataTypes.INTEGER(10).UNSIGNED,
    },
    Securtity_ID: {
      allowNull: false,
      type: DataTypes.INTEGER(10).UNSIGNED,
    },
    DailyPrice_Create: { type: DataTypes.DATE },
    DailyPrice_Active: { type: DataTypes.DATE },
    DailyPrice_Delete: { type: DataTypes.DATE },
  },
  { tableName: 'tkexchange_securtity' }
);
module.exports = tkexchange_securtity;
