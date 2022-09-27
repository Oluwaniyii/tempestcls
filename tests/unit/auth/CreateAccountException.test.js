"use strict";

require("mocha");
const { expect } = require("chai");
const AuthException = require("../../../src/components/auth/Exception/AuthException");
const CreateAccountException = require("../../../src/components/auth/Exception/CreateAccountException");

describe("createAccountException", function() {
  const createAccountException = new CreateAccountException();

  it("should be an Extention of AuthException", function() {
    expect(CreateAccountException.prototype instanceof AuthException).to.be.true;
  });

  it("should have status property set to 400", function() {
    expect(createAccountException).to.have.property("statusCode", 400);
  });

  it("should have message property set", function() {
    expect(createAccountException).to.have.property("message", "account creation failed");
  });
});
