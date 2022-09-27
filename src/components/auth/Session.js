const uuid = require("../../libraries/uuid");

class Session {
  sessionId;
  issuedAt;
  expiry = 86400000; // 1000 milliseconds = 1 second;  86,400 = 24 hours
  repository;

  constructor(repository) {
    this.repository = repository;
  }

  async store() {
    await this.repository.save({
      userId: this.userId,
      sessionId: this.sessionId,
      issuedAt: this.issuedAt,
      expireIn: this.expiry
    });
  }

  generateId() {
    this.sessionId = uuid.generate();
  }

  setIssuedAt() {
    this.issuedAt = new Date().getTime();
  }

  create() {
    this.generateId();
    this.setIssuedAt();
  }

  async issue(userId) {
    this.userId = userId;
    this.create();
    await this.store();

    return this.serialize();
  }

  serialize() {
    return { id: this.sessionId, issued_at: this.issuedAt, expire_in: this.expiry };
  }
}

module.exports = Session;
