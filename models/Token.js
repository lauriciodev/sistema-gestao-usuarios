const knex = require("../database/connection");
const User = require("./User");

class CreateToken {
  async create(email) {
    let result = await User.findByEmail(email);
    if (result != undefined) {
      try {
        console.log("tentando criar");
        let token = Date.now();
        await knex
          .insert({
            user_id: result.id,
            used: 0,
            token: token,
          })
          .table("tokens");
        return { status: true, token: token };
      } catch (error) {
        console.log(error);
        return { status: false, erro: "o email passado não existe !" };
      }
    } else {
      return { status: false, erro: "o email passado não existe2 !" };
    }
  }
}

module.exports = new CreateToken();
