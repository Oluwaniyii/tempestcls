const AuthException = require("./AuthException");

class CreateAccountException extends AuthException {
  constructor() {
    super();

    this.message = "account creation failed";
    this.statusCode = 400;
  }
}

module.exports = CreateAccountException;
