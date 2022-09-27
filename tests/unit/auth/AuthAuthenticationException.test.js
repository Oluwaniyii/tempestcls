"use strict";

require("mocha");
const { expect } = require("chai");
const AuthException = require("../../../src/components/auth/Exception/AuthException");
const AuthAuthenticationException = require("../../../src/components/auth/Exception/AuthAuthenticationException");

describe("AuthAuthenticationException", function() {
  const authAuthenticationException = new AuthAuthenticationException();

  it("should be an Extention of AuthException", function() {
    expect(AuthAuthenticationException.prototype instanceof AuthException).to.be.true;
  });

  it("should have status property set to 401", function() {
    expect(authAuthenticationException).to.have.property("statusCode", 401);
  });

  it("should have message property set", function() {
    expect(authAuthenticationException).to.have.property("message", "invalid credentials");
  });
});
