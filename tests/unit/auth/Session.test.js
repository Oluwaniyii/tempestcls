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
  const session = new Session();

  describe("issue", function() {
    it("should return a new session object", function() {
      const save = sinon.stub(SessionRepository.prototype, "save");
      const generate = sinon.stub(uuid, "generate").returns("1b2a3c4e25dc");
      const action = session.issue();

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

    it("should save session to database", async function() {
      const save = sinon.stub(SessionRepository.prototype, "save");
      const generate = sinon.stub(uuid, "generate").returns("1b2a3c4e25dc");
      await session.issue();

      sinon.assert.called(save);
      save.restore();
      generate.restore();
    });
  });
});
