"use strict";

require("mocha");
const { expect } = require("chai");
const User = require("../../../src/components/auth/User");

describe("User", function() {
  const user1 = {
    id: 1,
    username: "Johnny",
    email: "john@gmail.com",
    password: "john123"
  };
  const user = new User(user1.id, user1.username, user1.email, user1.password);

  it("it should be able get user details", function() {
    expect(user.getId()).to.equal(user1.id);
    expect(user.getUsername()).to.equal(user1.username);
    expect(user.getEmail()).to.equal(user1.email);
    expect(user.getPassword()).to.equal(user1.password);
  });

  describe("Serialize", function() {
    it("should return serialized data as a javascript object", function() {
      const serializedUserData = user.serialize();

      expect(serializedUserData).to.be.an("object");
    });

    it("should return an object with user's safe data", function() {
      const serializedUserData = user.serialize();

      expect(serializedUserData.userId).to.equal(user1.id);
      expect(serializedUserData.username).to.equal(user1.username);
      expect(serializedUserData.email).to.equal(user1.email);
    });

    it("should not return password alongside serialized data", function() {
      const serializedUserData = user.serialize();

      expect(serializedUserData.password).to.be.an("undefined");
    });
  });
});
