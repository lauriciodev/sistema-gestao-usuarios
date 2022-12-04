const knex = require("../database/connection");
const User = require("./User");

class CreateToken {
  async create(email) {
    //variavel que  que recebe dados se email estiver cadastrado
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

  async teste(email) {
    let data = await User.findByEmail(email);
    return data;
  }
}

module.exports = new CreateToken();
