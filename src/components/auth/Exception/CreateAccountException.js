class CreateAccountException extends Error {
  constructor() {
    super();

    this.message = "account creation failed";
    this.statusCode = 400;
    this.isDeveloperError = false;
    this.stack = null;
  }
}

module.exports = CreateAccountException;
