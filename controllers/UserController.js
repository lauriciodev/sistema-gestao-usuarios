const { validEmail } = require("../models/User");
let User = require("../models/User");
let Token = require("../models/Token");

class UserController {
  async index(req, res) {
    let users = await User.findAll();
    res.json(users);
  }

  async recoverPassword(req, res) {
    let email = req.body;

    let response = await Token.create(email);

    if (response.status) {
      res.status(200);
      res.send(response.token);
    } else {
      res.status(406);
      res.json({ err: response.erro, response: response.status });
    }
  }

  async findUserId(req, res) {
    let id = req.params.id;
    let users = await User.findById(id);
    if (users == undefined) {
      res.status(404);
      res.json({});
    } else {
      res.status(200);
      res.json(users);
    }
  }

  async create(req, res) {
    let { email, name, password } = req.body;
    if (email == undefined) {
      res.status(400);
      res.json({ erro: "o email é inválido!" });
      return;
    }
    if (name == undefined) {
      res.status(400);
      res.json({ erro: "o nome é inválido!" });
      return;
    }
    if (password == undefined) {
      res.status(400);
      res.json({ erro: "o password  é inválido!" });
      return;
    }

    let emailExists = await User.findEmail(email);
    if (emailExists) {
      res.json({ erro: "email já está sendo usado" });
      res.status(406);
      return;
    }

    await User.create(email, password, name);
    res.status(200);
    res.json({ status: "usuario cadastrado" });
  }

  async edit(req, res) {
    let { id, name, role, email } = req.body;
    let result = await User.update(id, email, name, role);
    if (result != undefined) {
      if (result.status) {
        res.send("usuario atualizado");
      } else {
        res.status(406);
        res.send(result.erro);
      }
    } else {
      res.status(406);
      res.send("erro no servidor");
    }
  }

  async delete(req, res) {
    let id = req.params.id;
    let result = await User.deleteUsers(id);

    if (result.status) {
      res.status(200);
      res.send("usuario deletado com sucesso");
    } else {
      res.status(406);
      res.send("usuario não existe");
    }
  }
}

module.exports = new UserController();
