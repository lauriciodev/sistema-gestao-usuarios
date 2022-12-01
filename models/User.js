let knex = require("../database/connection");
let bcrypt = require("bcrypt");

class User {
  //buscando  todos os dados do usuario

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

  //busca por id

  async findById(id) {
    try {
      let user = await knex
        .select(["id", "name", "email", "role"])
        .where({ id: id })
        .table("users");

      if (user.length > 0) {
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

      //email foi passado
      if (email != undefined) {
        //email é diferente do email atual
        if (email != user.email) {
          let emailExists = await this.findEmail(email);
          if (emailExists == false) {
            editeUser.email = email;
          }
        }
      }

      if (name != undefined) {
        editeUser.name = name;
      }

      if (role != undefined) {
        editeUser.role = role;
      }
    } else {
      return { status: false, erro: "o usuario não existe !" };
    }
  }
}

module.exports = new User();
