const bcrypt = require("bcryptjs");

async function compare(password1, password2) {
  return await bcrypt.compare(password1, password2);
}

async function hash(password, saltRounds = 10) {
  return await bcrypt.hash(password, saltRounds);
}

module.exports = { compare, hash };
