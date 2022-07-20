"use strict";

const AuthAuthenticationException = require("./Exception/AuthAuthenticationException");
const User = require("./User");
const Session = require("./Session");
const bcrypt = require("../../libraries/bcrypt");

class Login {
  email;
  password;
  user;

  constructor(repository) {
    if (!repository) throw new Error("repository is required");

    this.repository = repository;
    this.session = new Session();
  }

  async setUser() {
    const { userId, username, email, password } = await this.repository.getUserByEmail(this.email);
    this.user = new User(userId, username, email, password);
  }

  async verifyPassword() {
    return await bcrypt.compare(this.password, this.user.getPassword());
  }

  async issueNewSession() {
    return await this.session.issue(this.user.getId());
  }

  async authenticate() {
    let isEmailAvailable;
    let isValidPassword;
    let isAuthenticated = false;

    isEmailAvailable = await this.repository.emailExists(this.email);

    if (!isEmailAvailable) return isAuthenticated;

    await this.setUser();

    isValidPassword = await this.verifyPassword();

    if (isValidPassword) isAuthenticated = true;

    return isAuthenticated;
  }

  async init(email, password) {
    this.email = email;
    this.password = password;

    if (!(await this.authenticate())) throw new AuthAuthenticationException();

    return {
      userId: this.user.getId(),
      session: await this.issueNewSession()
    };
  }
}

module.exports = Login;
