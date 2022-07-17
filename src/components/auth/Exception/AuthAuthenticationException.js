class AuthException extends Error {
  constructor() {
    super();

    this.message = "invalid credentials";
    this.statusCode = 401;
    this.isDeveloperError = false;
    this.stack = null;
  }
}

module.exports = AuthException;
