const knex = require("../database/connection");
const User = require("./User");

class CreateToken {
  async getEmail(email) {
    let result = await User.findByEmail(email);
    return result;
  }
}

module.exports = new CreateToken();
