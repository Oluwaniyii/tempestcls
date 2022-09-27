require("mocha");
const chai = require("chai");
const { expect } = chai;
const chaiHttp = require("chai-http");
const app = require("../../src/app");
const UserModel = require("../../src/components/auth/Repository/User/UserModel");
const SessionModel = require("../../src/components/auth/Repository/Session/SessionModel");
const bcrypt = require("../../src/libraries/bcrypt");
const { sequelizeConnect } = require("../../src/db");

chai.use(chaiHttp);

sequelizeConnect();

describe("Auth", function() {
  describe("POST /auth/login", function() {
    /**
     * In my Int tests, I use the before and after to setup and cleanup data in the db
     *  This is not advisable, You should use seeders instead
     * But I'm just extra lazy and I want my Int  tests in one click
     */
    before(async function() {
      try {
        UserModel.bulkCreate([
          {
            userId: "3b2a3c4e25dc",
            username: "John Smith",
            email: "johnsmith@gmail.com",
            password: await bcrypt.hash("John123", 10)
          },
          {
            userId: "1b2a3c4e25dc",
            username: "Jane Smith",
            email: "janesmith@gmail.com",
            password: await bcrypt.hash("Jane123", 10)
          }
        ]);
      } catch (err) {
        console.log(err);
      }
    });
    after(async function() {
      try {
        UserModel.destroy({
          where: {},
          truncate: true
        });
        SessionModel.destroy({
          where: {},
          truncate: true
        });
      } catch (err) {
        console.log(err);
      }
    });

    describe("should return an unauthorised respone for wrong credentials", function() {
      const testDatas = [
        { email: "unkownemail@example.com", password: "12345678" },
        { email: "johnsmith@gmail.com", password: "John1234" },
        { email: "janesmith@gmail.com", password: "John123" }
      ];

      testDatas.forEach(function(data, index) {
        it(`TestData ${index + 1}`, function(done) {
          this.timeout(0);

          chai
            .request(app)
            .post("/auth/login")
            .send(data)
            .then(res => {
              expect(res).to.have.status(401);
              expect(res).to.have.header("Content-Type", /^application\/json/);

              const responseData = JSON.parse(res.text);
              expect(responseData).to.have.property("error");
              expect(responseData).to.have.property("message", "invalid credentials");
              done();
            })
            .catch(err => {
              done(err);
            });
        });
      });
    });

    describe("Should return a new session object for authenticated user", function(done) {
      const testDatas = [
        { email: "johnsmith@gmail.com", password: "John123" },
        { email: "janesmith@gmail.com", password: "Jane123" }
      ];

      testDatas.forEach(function(data, index) {
        it(`TestData ${index + 1}`, function(done) {
          this.timeout(0);
          chai
            .request(app)
            .post("/auth/login")
            .send(data)
            .then(res => {
              expect(res).to.have.status(200);
              expect(res).to.have.header("Content-Type", /^application\/json/);

              const responseData = JSON.parse(res.text);
              expect(responseData).to.be.have.property("userId");
              expect(responseData).to.be.have.property("session");
              expect(responseData.session).to.have.property("id");
              expect(responseData.session).to.have.property("issued_at");
              expect(responseData.session).to.have.property("expire_in");
              done();
            })
            .catch(err => {
              done(err);
            });
        });
      });
    });
  });

  describe("POST /auth/create", function() {
    before(async function() {
      UserModel.bulkCreate([
        {
          userId: "1b2a3c4e25dc",
          username: "John Smith",
          email: "johnsmith@gmail.com",
          password: await bcrypt.hash("John123", 10)
        }
      ]);
    });
    after(async function() {
      try {
        UserModel.destroy({
          where: {},
          truncate: true
        });
      } catch (err) {
        console.log(err);
      }
    });

    it("should return an account creation failure respone if email is taken", function(done) {
      this.timeout(0);
      const data = {
        username: "John Doe",
        email: "johnsmith@gmail.com",
        password: "John123"
      };

      chai
        .request(app)
        .post("/auth/create")
        .send(data)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res).to.have.header("Content-Type", /^application\/json/);

          const responseData = JSON.parse(res.text);
          expect(responseData).to.have.property("error");
          expect(responseData).to.have.property("message", "account creation failed");
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it("should return a response with newly created user data", function(done) {
      this.timeout(0);
      const data = {
        username: "John Doe",
        email: "johndoe@gmail.com",
        password: "John123"
      };

      chai
        .request(app)
        .post("/auth/create")
        .send(data)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res).to.have.header("Content-Type", /^application\/json/);

          const responseData = JSON.parse(res.text);
          expect(responseData).to.have.property("userId");
          expect(responseData.userId).to.be.a("string");
          expect(responseData).to.have.property("username", data.username);
          expect(responseData).to.have.property("email", data.email);
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });
});
