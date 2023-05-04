//Módulos
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//Models
const User = require("../../modelstemp/User.js");
const {Usuario} = require("../models/Usuario.js");

async function queijo() {
  console.log(Usuario);
}
console.log(Usuario);
queijo();

const userController = {
  //Cadastro
  showCadastro(req, res) {
    //Redireciona pra home caso ele já esteja logado
    if (res.locals.isLogged) {
      return res.redirect("/");
    }

    res.render("cadastro");
  },

  cadastro(req, res) {
    //Fazer as validações do express validator aqui
    const errors = validationResult(req);

    //Verifica se o usuário e o cpf já existe
    const userExist = User.getUserByField("email", req.body.email);
    const cpfExist = User.getUserByField("cpf", req.body.cpf);
    if (userExist) {
      errors.errors.push({ msg: "Email já existente" });
    }
    if (cpfExist) {
      errors.errors.push({ msg: "CPF já existente" });
    }

    //Verifica se existem erros
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.render("cadastro", { errors: errors.mapped() });
    }

    //Faz o hash da senha
    const userToCreate = {
      ...req.body,
      senha: bcrypt.hashSync(req.body.senha, 10),
    };

    User.createUser(userToCreate);

    res.redirect("/login");
  },

  //Login
  showLogin(req, res) {
    res.render("login");
  },

  login(req, res) {
    //Caso ele já esteja logado desloga antes de fazer o login
    if (res.locals.isLogged) userController.logOut.bind(userController);

    const { email, senha } = req.body;

    console.log(email, senha);
    const user = User.getUserByField("email", email);
    console.log(user);

    //Não encontrou o user retorna
    if (user && bcrypt.compareSync(senha, user.senha)) {
      const userName = user.nome.split(" ")[0];
      //Gera o token de autenticação
      const token = jwt.sign(
        { id: user.id, email: user.email, name: userName },
        "batata"
      );
      //Cria o cookie com o token
      res.cookie("token", token, { maxAge: 2592000000 });
      return res.redirect("/");
    } else {
      return res.render("login", { msg: "Usuário. ou senha incorretos!" });
    }
  },

  logOut(req, res) {
    // req.session.destroy();
    res.clearCookie("token");
    res.locals.isLogged = false;
    delete res.locals.nameLogged;

    return res.redirect("/");
  },

  //Perfil
  showProfile(req, res) {
    const { id } = jwt.verify(req.cookies.token, "batata");
    const userLogged = User.getUserByField("id", id);

    res.render("perfilUsuario", { user: userLogged });
  },
};

module.exports = userController;
