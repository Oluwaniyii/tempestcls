"use strict";

require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");
const chai = require("chai");
const chaiaspromised = require("chai-as-promised");
const Login = require("../../../src/components/auth/Login");
const UserRepository = require("../../../src/components/auth/Repository/User/UserRepository");
const Session = require("../../../src/components/auth/Session");
const AuthAuthenticationException = require("../../../src/components/auth/Exception/AuthAuthenticationException");
const bcrypt = require("../../../src/libraries/bcrypt");

chai.use(chaiaspromised);

describe("Login", function() {
  describe("init", function() {
    const userRepository = new UserRepository();
    const session = new Session({});
    const login = new Login(userRepository, session);

    describe("should throw AuthAuthenticationException for wrong credentials", function() {
      const input = {
        email: "johndoe@gmail.com",
        password: "John1234"
      };

      it("should throw AuthAuthenticationException when email does not exist", function() {
        const emailExists = sinon.stub(userRepository, "emailExists").returns(false);
        const compare = sinon.stub(bcrypt, "compare").returns(false);

        const action = login.init(input.email, input.password);

        return expect(action).to.be.rejected.then(function(error) {
          expect(error).to.be.an.instanceof(AuthAuthenticationException);
          emailExists.restore();
          compare.restore();
        });
      });

      it("should throw AuthAuthenticationException when email exists but password is incorrect", function() {
        const emailExists = sinon.stub(userRepository, "emailExists").returns(true);
        const getUserByEmail = sinon.stub(userRepository, "getUserByEmail").returns({
          userId: "1b2a3c4e25dc",
          email: "johndoe@gmail.com",
          password: "John123"
        });
        const compare = sinon
          .stub(bcrypt, "compare")
          .callsFake(function(inputPassword, userPassword) {
            return inputPassword === userPassword;
          });

        const action = login.init(input.email, input.password);

        return expect(action).to.be.rejected.then(function(error) {
          expect(error).to.be.an.instanceof(AuthAuthenticationException);
          emailExists.restore();
          getUserByEmail.restore();
          compare.restore();
        });
      });
    });

    describe("should create a login session for user if login details is right", function() {
      this.timeout(0);

      const input = {
        email: "johndoe@gmail.com",
        password: "John123"
      };

      it("should return newly created user session data", function() {
        const emailExists = sinon.stub(userRepository, "emailExists").returns(true);
        const getUserByEmail = sinon.stub(userRepository, "getUserByEmail").returns({
          userId: "1b2a3c4e25dc",
          email: "johndoe@gmail.com",
          password: "John123"
        });
        const compare = sinon
          .stub(bcrypt, "compare")
          .callsFake(function(inputPassword, userPassword) {
            return inputPassword === userPassword;
          });
        const issue = sinon.stub(session, "issue").returns({
          id: "12ef3c4ad5bc",
          issued_at: new Date().getTime(),
          expire_in: 1000 * 36 * 24
        });

        const action = login.init(input.email, input.password);

        return expect(action).to.be.fulfilled.then(function(data) {
          expect(data).to.have.property("userId");
          expect(data).to.have.property("session");
          expect(data.session).to.be.an("object");
          expect(data.session).to.have.property("id");
          expect(data.session).to.have.property("issued_at");
          expect(data.session).to.have.property("expire_in");
          expect(data.session.id).to.be.a("string");
          expect(data.session.issued_at).to.be.a("number");
          expect(data.session.expire_in).to.be.a("number");
          emailExists.restore();
          getUserByEmail.restore();
          compare.restore();
          issue.restore();
        });
      });
    });
  });
});
