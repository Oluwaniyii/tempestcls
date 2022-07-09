const UserModel = require("./UserModel");

class UserRepository {
  constructor() {
    this.model = UserModel;
  }

  async emailExists(email) {
    const user = await this.model.findOne({ where: { email } });
    return user ? true : false;
  }

  async getUserByEmail() {
    const user = await this.model.findOne({ where: { email } });
    return user;
  }
}

module.exports = UserRepository;
