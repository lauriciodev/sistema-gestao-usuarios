class UserController {
  async index(req, res) {}

  async create(req, res) {
    console.log(req.body);
    res.send("tesde de controlador de rotas");
  }
}

module.exports = new UserController();
