function User(id, username, email, password) {
  this.id = id;
  this.username = username;
  this.email = email;
  this.password = password;
}

User.prototype.getId = function() {
  return this.id;
};

User.prototype.getUsername = function() {
  return this.username;
};

User.prototype.getEmail = function() {
  return this.email;
};

User.prototype.getPassword = function() {
  return this.password;
};

User.prototype.serialize = function() {
  return {
    id: this.id,
    username: this.username,
    email: this.email
  };
};

module.exports = User;
