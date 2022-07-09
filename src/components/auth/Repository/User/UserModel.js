const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../../../db/sequelize");

class User extends Model {}

User.init(
  {
    userId: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: "User",
    tableName: "User"
  }
);

module.exports = User;
