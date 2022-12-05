let knex = require("../database/connection");
let bcrypt = require("bcrypt");
const Token = require("./Token");

class User {
  //buscando  todos os dados do usuario

  async findAll() {
    try {
      let result = await knex
        .select(["id", "name", "email", "role"])
        .table("users");
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  //busca por id

  async findById(id) {
    try {
      let user = await knex
        .select(["id", "name", "email", "role"])
        .where({ id: id })
        .table("users");

      if (user.length > 0) {
        console.log(user);
        return user[0];
      } else {
        return undefined;
      }
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  //criando novo usuario

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

  //verificando existencia de email
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

  //atualização de dados do usuario

  async update(id, email, name, role) {
    //verificando a existencia do email

    let user = await this.findById(id);
    if (user != undefined) {
      let editeUser = {};

      //email foi passado?
      if (email != undefined) {
        //email é diferente do email atual
        if (email != user.email) {
          let emailExists = await this.findEmail(email);
          if (emailExists == false) {
            editeUser.email = email;
          } else {
            return { status: false, erro: "email já existe !" };
          }
        }
      }

      if (name != undefined) {
        editeUser.name = name;
      }

      if (role != undefined) {
        editeUser.role = role;
      }

      //enviando dados atualizados
      try {
        await knex.update(editeUser).where({ id: id }).table("users");
        return { status: true };
      } catch (erro) {
        return { status: false, erro: erro };
      }
    } else {
      return { status: false, erro: "o usuario não existe !" };
    }
  }

  //deletando usuarios
  async deleteUsers(id) {
    let idExists = await this.findById(id);
    if (idExists != undefined) {
      try {
        await knex.delete().where({ id: id }).table("users");
        return { status: true };
      } catch (erro) {
        return { status: false };
      }
    } else {
      return { erro: false };
    }
  }

  async changePassword(newPassword, id, token) {
    let hash = await bcrypt.hash(newPassword, 10);
    await knex.update({ password: hash }).where({ id: id }).table("users");
    await Token.setUsed(token);
  }
}

module.exports = new User();
