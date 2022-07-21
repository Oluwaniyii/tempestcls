"use strict";

const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../../../db/sequelize");

class Session extends Model {}

Session.init(
  {
    sessionId: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.STRING
    },
    issuedAt: {
      type: DataTypes.NUMBER
    },
    expireIn: {
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
