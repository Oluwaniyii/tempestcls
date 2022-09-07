class User {
  constructor(userId, username, email, password) {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  getId() {
    return this.userId;
  }

  getUsername() {
    return this.username;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

  serialize() {
    return {
      userId: this.userId,
      username: this.username,
      email: this.email
    };
  }
}

module.exports = User;
