"use strict";

const AuthException = require("./Exception/AuthException");
const User = require("./User");
const Session = require("./Session");

class Login {
  email;
  password;
  user;

  constructor(repository) {
    if (!repository) throw new Error("repository is required");

    this.repository = repository;
    this.session = new Session();
  }

  setUser(user) {
    this.user = new User(user);
  }

  verifyPassword() {
    return this.password === this.user.getPassword();
  }

  async issueNewSession() {
    return await this.session.issue();
  }

  async authenticate() {
    let isEmailAvailable;
    let isValidPassword;
    let isAuthenticated = false;

    isEmailAvailable = await this.repository.emailExists(this.email);

    if (isEmailAvailable) this.setUser(await this.repository.getUserByEmail(this.email));

    isValidPassword = this.verifyPassword();

    if (isEmailAvailable && isValidPassword) isAuthenticated = true;

    return isAuthenticated;
  }

  async init(email, password) {
    this.email = email;
    this.password = password;

    if (!(await this.authenticate())) throw new AuthException();

    return {
      userId: this.user.getId(),
      session: await this.issueNewSession()
    };
  }
}

module.exports = Login;
