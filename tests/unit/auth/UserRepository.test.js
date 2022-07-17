"use strict";

require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");
const UserRepository = require("../../../src/components/auth/Repository/User/UserRepository");

/**
 * This test is not to run tests on orm thats not ours to deal with but to test that the action of our repository behaves as expected
 * the repository is a middle-er between the ORM and our application (this test is kind of like an interface to assure our repository behaves the way we expect)
 */
describe("UserRepository", function() {
  describe("checkForEmail", function() {
    it("should return true if user with provided email exist", async function() {
      this.timeout(0);

      const userRepository = new UserRepository();
      const findOne = sinon.stub(userRepository.model, "findOne").returns({
        username: "John Doe",
        email: "johndoe@gmail.com",
        password: "John123"
      });
      const action = await userRepository.emailExists("johndoe@gmail.com");

      expect(action).to.be.true;
      findOne.restore();
    });

    it("should return false there is no user with provided email", async function() {
      this.timeout(0);

      const userRepository = new UserRepository();
      const findOne = sinon.stub(userRepository.model, "findOne").returns(null);
      const action = await userRepository.emailExists("johndoe@gmail.com");

      expect(action).to.be.false;
      findOne.restore();
    });
  });

  describe("getUserByEmail", function() {});
});
