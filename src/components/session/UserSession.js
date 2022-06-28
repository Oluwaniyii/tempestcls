function UserSession() {
  this.id;
  this.userId;
  this.issued_at;
  this.expire_in;
}

Session.prototype.create = function(userId) {};

Session.prototype.issueSessionCode = function() {
  return 1;
};

Session.prototype.store = function(session) {};

module.exports = UserSession;
