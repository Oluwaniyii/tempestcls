const chai = require("chai");
const { expect } = chai;
const chaiHttp = require("chai-http");
const app = require("../../src/app");

chai.use(chaiHttp);

describe("Auth", function() {
  describe("POST /auth/login", function() {
    it("Should return a new session object for authenticated user", function(done) {
      const data = { email: "johndoe@gmail.com", password: "John123" };
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

    it("should return an unauthorised respone for wrong credentials", function(done) {
      const data = { email: "janedoe@gmail.com", password: "John123" };
      chai
        .request(app)
        .post("/auth/login")
        .send(data)
        .then(res => {
          expect(res).to.have.status(401);
          expect(res).to.have.header("Content-Type", /^application\/json/);

          const responseData = JSON.parse(res.text);
          expect(responseData).to.be.have.property("error");
          expect(responseData).to.be.have.property("message", "invalid credentials");
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });
});
