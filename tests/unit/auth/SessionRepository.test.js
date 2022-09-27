require("mocha");
const sinon = require("sinon");
const SessionRepository = require("../../../src/components/auth/Repository/Session/SessionRepository");

describe("SessionRepository", function() {
  describe("method save", function() {
    const sessionRepository = new SessionRepository();

    it("should call repository 'save' method", async function() {
      const create = sinon.stub(sessionRepository.model, "create");
      await sessionRepository.save({
        userId: "1b2a3c4e25dc",
        sessionId: "1b2a3c4e25dcee",
        issuedAt: 1000,
        expireIn: 200
      });

      sinon.assert.calledOnceWithExactly(create, {
        userId: "1b2a3c4e25dc",
        sessionId: "1b2a3c4e25dcee",
        issuedAt: 1000,
        expireIn: 200
      });
      create.restore();
    });
  });
});
