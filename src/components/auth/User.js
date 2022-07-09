class User {
  constructor({ id, username, email, password }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  getId() {
    return this.id;
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
      id: this.id,
      username: this.username,
      email: this.email
    };
  }
}

module.exports = User;
