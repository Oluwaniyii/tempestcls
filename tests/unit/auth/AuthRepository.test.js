"use strict";

const mocha = require("mocha");
const { expect, assert } = require("chai");
const sinon = require("sinon");
const UserRepository = require("../../../src/components/auth/Repository");

describe.skip("UserRepository", function() {
  describe("getAllUsers", function() {
    it("should return empty array if theres no user in database", function() {});
    it("should return array of user objects", function() {});
  });

  describe("getOneUser", function() {
    it("should return empty array if theres no user in database", function() {});
    it("should return array of user objects", function() {});
  });

  describe("checkForEmail", function() {
    it("should return true if user with provided email exist", function() {});
    it("should return false there is no user with provided email", function() {});
  });
});
