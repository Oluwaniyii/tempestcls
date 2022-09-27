const AuthException = require("./AuthException");

class AuthAuthenticationException extends AuthException {
  constructor() {
    super();

    this.message = "invalid credentials";
    this.statusCode = 401;
  }
}

module.exports = AuthAuthenticationException;
