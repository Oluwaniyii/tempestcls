class AuthException extends Error {
  constructor(message) {
    super();

    this.message = message;
    this.statusCode = 400;
    this.isDeveloperError = false;
    this.stack = null;
  }
}

module.exports = AuthException;
