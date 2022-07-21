"use strict";

require("mocha");
const { expect } = require("chai");
const AuthAuthenticationException = require("../../../src/components/auth/Exception/AuthAuthenticationException");

describe("AuthAuthenticationException", function() {
  const authAuthenticationException = new AuthAuthenticationException();

  it("should be an instanceOf Error", function() {
    expect(authAuthenticationException).to.be.instanceOf(Error);
  });

  it("should have isDeverloperError property set to false", function() {
    expect(authAuthenticationException).to.have.property("isDeveloperError", false);
  });

  it("should have status property set to 401", function() {
    expect(authAuthenticationException).to.have.property("statusCode", 401);
  });

  it("should have stack property set to null", function() {
    expect(authAuthenticationException).to.have.property("stack", null);
  });
});
