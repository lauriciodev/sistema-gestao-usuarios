const { validEmail } = require("../models/User");
let User = require("../models/User");

class UserController {
  async index(req, res) {
    let users = await User.findAll();
    res.json(users);
  }

  async findUserId(req, res) {
    let id = req.params.id;
    let users = await User.findById(id);
    if (users != undefined) {
      res.status(404);
      res.json({});
    } else {
      console.log(users);

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
      res.status(406);
      res.json({ erro: "email já está sendo usado" });
      return;
    }

    await User.create(email, password, name);
    res.status(200);
    res.json({ status: "usuario cadastrado" });
  }
}

module.exports = new UserController();
