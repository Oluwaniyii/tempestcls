"use strict";

require("mocha");
const { expect } = require("chai");
const AuthException = require("../../../src/components/auth/Exception/AuthException");

describe("AuthException", function() {
  const authException = new AuthException();

  it("should be an instanceOf Error", function() {
    expect(authException).to.be.instanceOf(Error);
  });

  it("should have isDeveloperError property set to false", function() {
    expect(authException).to.have.property("isDeveloperError", false);
  });

  it("should have stack property set to null", function() {
    expect(authException).to.have.property("stack", null);
  });
});
