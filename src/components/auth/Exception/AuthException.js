class AuthException extends Error {
  constructor() {
    super();

    this.message = null;
    this.statusCode = null;
    this.isDeveloperError = false;
    this.stack = null;
  }
}

module.exports = AuthException;
