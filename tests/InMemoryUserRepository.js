/** @format */

"use strict";

class InMemoryUserRepository {
  constructor(users = null) {
    this.users = users || [
      {
        id: 1,
        username: "user1",
        email: "user1@email.com",
        password: "user1123"
      },
      {
        id: 2,
        username: "user2",
        email: "user2@email.com",
        password: "user2123"
      },
      {
        id: 3,
        username: "user3",
        email: "user3@email.com",
        password: "user3123"
      }
    ];
  }

  emailExists(email) {
    let emailExists = false;

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].email === email) {
        emailExists = true;
        return emailExists;
      }
    }

    return emailExists;
  }

  getUserByEmail(email) {
    let user;

    for (let i = 0; i < this.users.length; i += 1) {
      if (this.users[i].email === email) {
        user = this.users[i];

        return user;
      }
    }
  }
}

module.exports = InMemoryUserRepository;
