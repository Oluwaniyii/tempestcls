/** @format */
require("dotenv").config();

module.exports = {
  development: {
    storage: "./data/sqlite/database.sqlite",
    dialect: "sqlite",
    migrationStorage: "json",
    migrationStoragePath: "sequelizeMeta.json"
  },
  test: {
    storage: "./data/sqlite/database.sqlite",
    dialect: "sqlite",
    migrationStorage: "json",
    migrationStoragePath: "sequelizeMeta.json"
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    migrationStorage: "sequelize"
  }
};
