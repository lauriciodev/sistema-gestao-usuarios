let knex = require("../database/connection");
let bcrypt = require("bcrypt");

class User {
  async findAll() {
    try {
      let result = await knex
        .select(["id", "name", "email", "role"])
        .table("users");
      return result;
    } catch (error) {
      console.log(erro);
      return [];
    }
  }

  async create(email, password, name) {
    try {
      let hash = await bcrypt.hash(password, 10);

      await knex
        .insert({ email, password: hash, name, role: 0 })
        .table("users");
    } catch (erro) {
      console.log(erro);
    }
  }

  async findEmail(email) {
    try {
      let result = await knex.select("*").from("users").where({ email: email });
      if (result.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (erro) {
      console.log(erro);
      return false;
    }
  }
}

module.exports = new User();
