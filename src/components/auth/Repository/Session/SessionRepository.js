"use strict";

const SessionModel = require("./SessionModel");
const winston = require("../../../../utils/logger/winston");

class SessionRepository {
  constructor() {
    this.model = SessionModel;
  }

  async save({ sessionId, issuedAt, expireIn }) {
    await this.model.create({ session_id: sessionId, issued_at: issuedAt, expire_in: expireIn });

    winston.log("created new session");
  }
}

module.exports = SessionRepository;
