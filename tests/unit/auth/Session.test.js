"use strict";

require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");
const chai = require("chai");
const chaiaspromised = require("chai-as-promised");
const Session = require("../../../src/components/auth/Session");
const SessionRepository = require("../../../src/components/auth/Repository/Session/SessionRepository");
const uuid = require("../../../src/libraries/uuid");

chai.use(chaiaspromised);

describe("Session", function() {
  const sessionRepository = new SessionRepository();
  const session = new Session(sessionRepository);

  describe("issue", function() {
    it("should save session to database", async function() {
      this.timeout(0);
      const save = sinon.stub(sessionRepository, "save");
      const generate = sinon.stub(uuid, "generate").returns("1b2a3c4e25dcee");
      const userId = "1b2a3c4e25dc";
      await session.issue(userId);

      sinon.assert.calledWithExactly(save, {
        userId: userId,
        sessionId: session.sessionId,
        issuedAt: session.issuedAt,
        expireIn: session.expiry
      });
      save.restore();
      generate.restore();
    });

    it("should return session object created for userId", function() {
      this.timeout(0);
      const save = sinon.stub(sessionRepository, "save");
      const generate = sinon.stub(uuid, "generate").returns("1b2a3c4e25dcee");
      const userId = "1b2a3c4e25dc";
      const action = session.issue(userId);

      return expect(action).to.be.fulfilled.then(function(data) {
        expect(data).to.be.an("object");
        expect(data).to.have.property("id");
        expect(data).to.have.property("issued_at");
        expect(data).to.have.property("expire_in");
        expect(data.id).to.be.a("string");
        expect(data.issued_at).to.be.a("number");
        expect(data.expire_in).to.be.a("number");

        save.restore();
        generate.restore();
      });
    });
  });
});
