"use strict";

const SessionModel = require("./SessionModel");

class SessionRepository {
  constructor() {
    this.model = SessionModel;
  }

  async save({ userId, sessionId, issuedAt, expireIn }) {
    await this.model.create({ userId, sessionId, issuedAt, expireIn });
  }
}

module.exports = SessionRepository;
