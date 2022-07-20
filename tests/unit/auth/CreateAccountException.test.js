"use strict";

require("mocha");
const { expect } = require("chai");
const CreateAccountException = require("../../../src/components/auth/Exception/CreateAccountException.js");

describe("createAccountException", function() {
  const createAccountException = new CreateAccountException();

  it("should be an instanceOf Error", function() {
    expect(createAccountException).to.be.instanceOf(Error);
  });

  it("should have isDeverloperError property set to false", function() {
    expect(createAccountException).to.have.property("isDeveloperError", false);
  });

  it("should have status property set to 401", function() {
    expect(createAccountException).to.have.property("statusCode", 400);
  });

  it("should have stack property set to null", function() {
    expect(createAccountException).to.have.property("stack", null);
  });
});
