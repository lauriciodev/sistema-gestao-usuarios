const knex = require("../database/connection");
const { findByEmail } = require("./User");

class CreateToken {
  async create(email) {
    //variavel que  que recebe dados se email estiver cadastrado

    let result = await findByEmail(email);
    if (result != undefined) {
      try {
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
      return { status: false, erro: "o email passado não existe !" };
    }
  }
  async validate(token) {
    try {
      let result = await knex.select().where({ token: token }).table("tokens");
      if (result.length > 0) {
        let tk = result[0];
        if (tk.used) {
          return { status: false };
        } else {
          return { status: true, token: tk };
        }
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async setUsed(token) {
    await knex.update({ used: 1 }).where({ token: token }).table("tokens");
  }
}

module.exports = new CreateToken();
