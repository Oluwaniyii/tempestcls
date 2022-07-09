"use strict";

const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../../../db/sequelize");

class Session extends Model {}

Session.init(
  {
    sessionId: {
      type: DataTypes.STRING
    },
    issued_at: {
      type: DataTypes.NUMBER
    },
    expire_in: {
      type: DataTypes.NUMBER
    }
  },
  {
    sequelize,
    modelName: "Session",
    tableName: "Session"
  }
);

module.exports = Session;
