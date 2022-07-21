const bcrypt = require("bcryptjs");

async function compare(password1, password2) {
  return await bcrypt.compare(password1, password2);
}

module.exports = { compare };
