const uuid = require("../../libraries/uuid");
const bcrypt = require("../../libraries/bcrypt");
const User = require("./User");
const CreateAccountException = require("./Exception/CreateAccountException");

class CreateAccount {
  username;
  email;
  password;
  user;

  constructor(repository) {
    this.repository = repository;
  }

  async emailExists(email) {
    return await this.repository.emailExists(email);
  }

  async createUser() {
    const newUser = await this.repository.createUser(
      this.userId,
      this.username,
      this.email,
      this.password
    );

    return newUser;
  }

  async hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async init(username, email, password) {
    if (await this.emailExists(email)) throw new CreateAccountException(); // fail fast

    this.userId = uuid.generate();
    this.username = username;
    this.email = email;
    this.password = await this.hashPassword(password);

    await this.createUser();

    this.user = new User(this.userId, this.username, this.email, this.password);
    return this.user.serialize();
  }
}

module.exports = CreateAccount;
