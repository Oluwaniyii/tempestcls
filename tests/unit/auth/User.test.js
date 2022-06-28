"use strict";

const mocha = require("mocha");
const { expect, assert } = require("chai");
const sinon = require("sinon");

const User = require("../../../src/components/auth/User");

describe("Mocha", function() {
  it("Test that Mocha is Working", function() {
    expect(true).to.be.true;
  });
});

describe("User Model", function() {
  const user1 = {
    id: 1,
    username: "Johnny",
    email: "john@gmail.com",
    password: "john123"
  };

  const user = new User(user1["id"], user1["username"], user1["email"], user1["password"]);

  it("it should be able get user details", function() {
    expect(user.getId()).to.equal(user1["id"]);
    expect(user.getUsername()).to.equal(user1["username"]);
    expect(user.getEmail()).to.equal(user1["email"]);
    expect(user.getPassword()).to.equal(user1["password"]);
  });

  describe("it should be able to serialize user data with the expception of password", function() {
    it("should return serialized data as a javascript object", function() {
      const serializedUserData = user.serialize();

      expect(serializedUserData).to.be.an("object");
    });

    it("should return an object with user safe data", function() {
      const serializedUserData = user.serialize();

      expect(serializedUserData["id"]).to.equal(user1["id"]);
      expect(serializedUserData["username"]).to.equal(user1["username"]);
      expect(serializedUserData["email"]).to.equal(user1["email"]);
    });

    it("should not return password alongside serialized data", function() {
      const serializedUserData = user.serialize();

      expect(serializedUserData["password"]).to.be.an("undefined");
    });
  });
});
