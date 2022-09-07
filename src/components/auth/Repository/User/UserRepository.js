const UserModel = require("./UserModel");

class UserRepository {
  constructor() {
    this.model = UserModel;
  }

  async emailExists(email) {
    const user = await this.model.findOne({ where: { email } });
    return user ? true : false;
  }

  async getUserByEmail(email) {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }

  async createUser(userId, username, email, password) {
    const newUser = await this.model.create({ userId, username, email, password });
    return newUser;
  }
}

module.exports = UserRepository;
