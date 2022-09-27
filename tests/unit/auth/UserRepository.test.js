"use strict";

require("mocha");
const { expect, use } = require("chai");
const sinon = require("sinon");
const UserRepository = require("../../../src/components/auth/Repository/User/UserRepository");

describe("UserRepository", function() {
  describe("emailExists", function() {
    const userRepository = new UserRepository();

    it("should return true if user with provided email exist", async function() {
      this.timeout(0);
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
      const findOne = sinon.stub(userRepository.model, "findOne").returns(null);
      const action = await userRepository.emailExists("johndoe@gmail.com");

      expect(action).to.be.false;
      findOne.restore();
    });
  });

  describe("createUser", function() {
    const userRepository = new UserRepository();
    const user = {
      id: "1b2a3c4e25dc",
      username: "John Doe",
      email: "johndoe@gmail.com",
      password: "John123 "
    };

    it("should call model 'create' with correct details", async function() {
      const create = sinon.stub(userRepository.model, "create");

      await userRepository.createUser(user.id, user.username, user.email, user.password);

      sinon.assert.calledOnceWithExactly(create, {
        userId: user.id,
        username: "John Doe",
        email: user.email,
        password: user.password
      });
    });
  });

  describe("getUserByEmail", async function() {
    const userRepository = new UserRepository();

    it("should call model 'findOne' with given email", async function() {
      const findOne = sinon.stub(userRepository.model, "findOne");
      await userRepository.getUserByEmail("john@example.com");

      sinon.assert.calledOnceWithExactly(findOne, { where: { email: "john@example.com" } });

      findOne.restore();
    });
  });
});
