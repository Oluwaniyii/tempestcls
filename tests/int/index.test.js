const chai = require("chai");
const { expect } = chai;
const chaiHttp = require("chai-http");
const app = require("../../src/app");

chai.use(chaiHttp);

describe.skip("Home route", function() {
  describe("GET /", function() {
    it("Should return Status 200 and Content-Type application/json ", function(done) {
      chai
        .request(app)
        .get("/")
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res).to.have.header("Content-Type", /^application\/json/);
          expect(JSON.parse(res.text)).to.be.have.property("hello", "hi");
          done();
        });
    });
  });
});
