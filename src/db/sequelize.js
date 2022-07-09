const { Sequelize } = require("sequelize");
const config = require("config");
const winston = require("../utils/logger/winston");

const sequelize = new Sequelize(
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

function onSIGINT() {
  sequelize.close();
}

async function connect() {
  try {
    await sequelize.authenticate();
    winston.log("debug", "Connection has been established successfully");
  } catch (e) {
    winston.error("Unable to connect to the database:", e);
  }

  process.on("SIGINT", onSIGINT);
}

module.exports.connect = connect;
module.exports.sequelize = sequelize;
