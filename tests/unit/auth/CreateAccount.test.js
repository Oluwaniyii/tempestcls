"use strict";

require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");
const chai = require("chai");
const chaiaspromised = require("chai-as-promised");
const CreateAccount = require("../../../src/components/auth/CreateAccount.js");
const UserRepository = require("../../../src/components/auth/Repository/User/UserRepository");
const CreateAccountException = require("../../../src/components/auth/Exception/CreateAccountException");
const uuid = require("../../../src/libraries/uuid");
const bcrypt = require("../../../src/libraries/bcrypt");

chai.use(chaiaspromised);

describe("Create Account", function() {
  const userRepository = new UserRepository();
  const createAccount = new CreateAccount(userRepository);

  describe("init", function() {
    it("Should throw an exception if email is taken", function() {
      this.timeout(0);

      const hash = sinon.stub(bcrypt, "hash").callsFake(function(password, saltRounds) {
        return password;
      });
      const generate = sinon.stub(uuid, "generate").returns("1b2a3c4e25dc");
      const emailExists = sinon.stub(userRepository, "emailExists").returns(true);
      const createUser = sinon.stub(userRepository, "createUser");

      const userdata = {
        username: "John Doe",
        email: "johndoe@gmail.com",
        password: "John1234"
      };
      const action = createAccount.init(userdata.username, userdata.email, userdata.password);

      return expect(action).to.be.rejected.then(function(error) {
        expect(error).to.be.instanceOf(CreateAccountException);

        hash.restore();
        generate.restore();
        emailExists.restore();
        createUser.restore();
      });
    });

    describe("Should create a new user when everything is right", function() {
      const user = {
        username: "Jane Doe",
        email: "janedoe@gmail.com",
        password: "Jane123"
      };

      it("should create user in database", async function() {
        this.timeout(0);

        const hash = sinon.stub(bcrypt, "hash").callsFake(function(password, saltRounds) {
          return password;
        });
        const generate = sinon.stub(uuid, "generate").returns("1b2a3c4e25dc");
        const emailExists = sinon.stub(userRepository, "emailExists").returns(false);
        const createUser = sinon.stub(userRepository, "createUser");

        await createAccount.init(user.username, user.email, user.password);

        sinon.assert.calledWith(
          createUser,
          "1b2a3c4e25dc",
          user.username,
          user.email,
          user.password
        );

        createUser.restore();
        generate.restore();
        hash.restore();
        emailExists.restore();
      });

      it("should return created user's safe data with a newly assigned user id ", function() {
        this.timeout(0);

        const hash = sinon.stub(bcrypt, "hash").callsFake(function(password, saltRounds) {
          return password;
        });
        const generate = sinon.stub(uuid, "generate").returns("1b2a3c4e25dc");
        const emailExists = sinon.stub(userRepository, "emailExists").returns(false);
        const createUser = sinon
          .stub(userRepository, "createUser")
          .callsFake(function(userId, username, email, password) {
            return { userId, username, email, password };
          });

        const action = createAccount.init(user.username, user.email, user.password);

        return expect(action).to.be.fulfilled.then(function(data) {
          expect(data).to.be.an("object");
          expect(data).to.have.property("userId", "1b2a3c4e25dc");
          expect(data).to.have.property("username", user.username);
          expect(data).to.have.property("email", user.email);
          expect(data.userId).to.be.a("string");
          expect(data.password).to.be.a("undefined");

          hash.restore();
          generate.restore();
          emailExists.restore();
          createUser.restore();
        });
      });
    });
  });
});
