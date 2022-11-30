class UserController {
  async index(req, res) {}

  async create(req, res) {
    let { email, name, password } = req.body;
    if (email == undefined) {
      res.status(403);
      res.json({ erro: "o email é inválido!" });
    }
    if (name == undefined) {
      res.status(403);
      res.json({ erro: "o nome é inválido!" });
    }
    if (password == undefined) {
      res.status(403);
      res.json({ erro: "o password  é inválido!" });
    }

    res.status(200);
  }
}

module.exports = new UserController();
