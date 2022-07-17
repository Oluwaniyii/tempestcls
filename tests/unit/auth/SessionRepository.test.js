require("mocha");
const sinon = require("sinon");
const SessionRepository = require("../../../src/components/auth/Repository/Session/SessionRepository");

describe("SessionRepository", function() {
  describe("method save", function() {
    const sessionRepository = new SessionRepository();

    it("should call repository 'create' method", async function() {
      const create = sinon.stub(sessionRepository.model, "create");
      await sessionRepository.save({});

      sinon.assert.calledOnce(create);
      create.restore();
    });
  });
});
