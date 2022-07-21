const { v4: uuidv4 } = require("uuid");

function generate() {
  return uuidv4();
}

module.exports.generate = generate;
