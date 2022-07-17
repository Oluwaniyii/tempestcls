"use strict";

const SessionModel = require("./SessionModel");

class SessionRepository {
  constructor() {
    this.model = SessionModel;
  }

  async save({ sessionId, issuedAt, expireIn }) {
    await this.model.create({ session_id: sessionId, issued_at: issuedAt, expire_in: expireIn });
  }
}

module.exports = SessionRepository;
