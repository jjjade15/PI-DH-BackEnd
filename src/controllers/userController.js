const { use } = require("../routes/routes");

const userController = {
  //Cadastro
  showCadastro(req, res) {
    res.render("cadastro");
  },

  cadastro(req, res) {
    console.log(req.body);
    res.redirect("/");
  },

  //Login
  showLogin(req, res) {
    res.render("login");
  },

  login(req, res) {
    console.log(req.body);
    res.redirect("/"); //colocar redirect para voltar para home
  },
};

module.exports = userController;