const AuthException = require("./AuthException");

class AuthValidationException extends AuthException {
  constructor(message) {
    super();

    this.message = message;
    this.statusCode = 400;
  }
}

module.exports = AuthValidationException;
