const { Sequelize } = require("sequelize");
const config = require("config");
const winston = require("../utils/logger/winston");
let sequelize;

if (process.env.NODE_ENV === "production") {
  // Seperate in different files. I'm Just  being lazy
  sequelize = new Sequelize(
    config.get("db.mysql.database"),
    config.get("db.mysql.user"),
    config.get("db.mysql.password"),
    {
      host: config.get("db.mysql.host"),
      dialect: "mysql",
      define: {
        freezeTableName: true
      }
    }
  );
} else {
  sequelize = new Sequelize("database", "username", "password", {
    dialect: "sqlite",
    storage: "./data/sqlite/database.sqlite",
    define: {
      freezeTableName: true
    }
  });
}

function onSIGINT() {
  sequelize.close();
}

async function connect() {
  try {
    await sequelize.authenticate();
    winston.log("debug", "Database connection has been established successfully");
  } catch (e) {
    winston.error("Unable to connect to the database:", e);
  }

  process.on("SIGINT", onSIGINT);
}

module.exports.connect = connect;
module.exports.sequelize = sequelize;
