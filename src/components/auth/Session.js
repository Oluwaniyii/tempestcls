const uuid = require("../../libraries/uuid");
const SessionRepository = require("./Repository/Session/SessionRepository");

class Session {
  id;
  issuedAt;
  expiry = 86400000; // 1000 milliseconds = 1 second;  86,400 = 24 hours
  repository;

  constructor() {
    this.repository = new SessionRepository();
  }

  async store() {
    await this.repository.save({
      sessionId: this.id,
      issuedAt: this.issuedAt,
      expireIn: this.expiry
    });
  }

  generateId() {
    this.id = uuid.generate();
  }

  setIssuedAt() {
    this.issuedAt = new Date().getTime();
  }

  create() {
    this.generateId();
    this.setIssuedAt();
  }

  async issue() {
    this.create();
    await this.store();

    return this.serialize();
  }

  serialize() {
    return { id: this.id, issued_at: this.issuedAt, expire_in: this.expiry };
  }
}

module.exports = Session;
