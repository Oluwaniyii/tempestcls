"use strict";

require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");
const chai = require("chai");
const chaiaspromised = require("chai-as-promised");
const CreateAccount = require("../../../src/components/auth/CreateAccount.js");
const InMemoryRepository = require("../../InMemoryUserRepository");
const CreateAccountException = require("../../../src/components/auth/Exception/CreateAccountException");
const uuid = require("../../../src/libraries/uuid");
const bcrypt = require("../../../src/libraries/bcrypt");

chai.use(chaiaspromised);

describe("Create Account", function() {
  const repository = new InMemoryRepository([
    {
      id: 1,
      username: "John Doe",
      email: "johndoe@gmail.com",
      password: "John123"
    }
  ]);
  const createAccount = new CreateAccount(repository);

  describe("init", function() {
    it("Should throw an exception if email is taken", function() {
      const userdata = {
        username: "John Doe",
        email: "johndoe@gmail.com",
        password: "John1234"
      };
      const action = createAccount.init(userdata.username, userdata.email, userdata.password);

      return expect(action).to.be.rejected.then(function(error) {
        expect(error).to.be.instanceOf(CreateAccountException);
      });
    });

    describe("Should create a new user when everything is right", function() {
      const user = {
        username: "Jane Doe",
        email: "janedoe@gmail.com",
        password: "Jane123"
      };

      it("should return created user's safe data with a newly assigned user id ", function() {
        const hash = sinon.stub(bcrypt, "hash").callsFake(function(password, saltRounds) {
          return password;
        });
        const generate = sinon.stub(uuid, "generate").returns("1b2a3c4e25dc");

        const action = createAccount.init(user.username, user.email, user.password);

        return expect(action).to.be.fulfilled.then(function(data) {
          expect(data).to.be.an("object");
          expect(data).to.have.property("userId");
          expect(data).to.have.property("username", user.username);
          expect(data).to.have.property("email", user.email);
          expect(data.userId).to.be.a("string");
          expect(data.password).to.be.a("undefined");
          hash.restore();
          generate.restore();
        });
      });

      it("should create user in database", async function() {
        const hash = sinon.stub(bcrypt, "hash").callsFake(function(password, saltRounds) {
          return password;
        });
        const generate = sinon.stub(uuid, "generate").returns("1b2a3c4e25dc");
        const create = sinon.spy(repository, "createUser");
        await createAccount.init(user.username, user.email, user.password);

        sinon.assert.calledWith(create, "1b2a3c4e25dc", user.username, user.email, user.password);
        create.restore();
        generate.restore();
        hash.restore();
      });
    });
  });
});
