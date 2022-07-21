"use strict";

require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");
const chai = require("chai");
const chaiaspromised = require("chai-as-promised");
const Login = require("../../../src/components/auth/Login");
const InMemoryRepository = require("../../InMemoryUserRepository");
const Session = require("../../../src/components/auth/Session");
const AuthAuthenticationException = require("../../../src/components/auth/Exception/AuthAuthenticationException");
const bcrypt = require("../../../src/libraries/bcrypt");

chai.use(chaiaspromised);

describe("Login", function() {
  describe("init", function() {
    const repository = new InMemoryRepository([
      {
        id: 1,
        username: "John Doe",
        email: "johndoe@gmail.com",
        password: "John123"
      },
      {
        id: 2,
        username: "Jane Doe",
        email: "janedoe@gmail.com",
        password: "Jane123"
      }
    ]);

    const login = new Login(repository);

    describe("should throw an exception for wrong credentials", function() {
      const inputs = [
        {
          email: "johndoe@gmail.com",
          password: "John1234"
        },
        {
          email: "johfdoe@gmail.com",
          password: "John1234"
        },
        {
          email: "janedoe@gmail.com",
          password: "John123"
        }
      ];

      inputs.forEach(function(input, index) {
        it(`dataCase ${index + 1}`, function() {
          const compare = sinon.stub(bcrypt, "compare").callsFake(function(password1, password2) {
            return password1 === password2;
          });
          const action = login.init(input.email, input.password);

          return expect(action).to.be.rejected.then(function(error) {
            expect(error).to.be.an.instanceOf(AuthAuthenticationException);
            compare.restore();
          });
        });
      });
    });

    describe("should return a session object for user if everything is right", function() {
      const inputs = [
        {
          email: "johndoe@gmail.com",
          password: "John123"
        },
        {
          email: "janedoe@gmail.com",
          password: "Jane123"
        }
      ];

      inputs.forEach(function(input, index) {
        it(`dataCase ${index + 1}`, function() {
          const compare = sinon.stub(bcrypt, "compare").callsFake(function(password1, password2) {
            return password1 === password2;
          });
          const issue = sinon.stub(Session.prototype, "issue").returns({
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
            issue.restore();
            compare.restore();
          });
        });
      });
    });
  });
});
