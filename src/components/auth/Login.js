/**
 * @param {object} repository
 */
function Login(repository) {
  this.repository = repository;
}

Login.prototype.verifyPassword = function(password, userPassword) {
  return password === userPassword;
};

/**
 *
 * @param {string} userEmail
 * @param {string} userPassword
 */
Login.prototype.authenticateUser = function(userEmail, userPassword) {
  let user;
  let session;
  let isUserAuthenticated;
  let isEmailAvailable;
  let isValidPassword;
};

module.exports = Login;
