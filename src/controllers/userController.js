//Módulos
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//Models
const User = require("../../modelstemp/User.js");
const { Usuario } = require("../models");

const userController = {
  //Cadastro
  showCadastro(req, res) {
    //Redireciona pra home caso ele já esteja logado
    if (res.locals.isLogged) {
      return res.redirect("/");
    }

    res.render("cadastro");
  },

  async cadastro(req, res) {
    //Fazer as validações do express validator aqui
    const errors = validationResult(req);

    //Verifica se o email e o cpf já existem
    const userExist = await Usuario.findOne({
      where: { email: req.body.email },
    });
    const cpfExist = await Usuario.findOne({ where: { cpf: req.body.cpf } });

    if (userExist) {
      console.log("email já existe");
      errors.errors.push({ msg: "Email já existente" });
    }
    if (cpfExist) {
      console.log("cpf já existente");
      errors.errors.push({ msg: "CPF já existente" });
    }

    //Verifica se existem erros no express validator
    if (!errors.isEmpty()) {
      return res.render("cadastro", { errors: errors.mapped() });
    }

    //Cria o cadastro caso não tenha erros

    //Faz o hash da senha
    const userToCreate = {
      ...req.body,
      senha: bcrypt.hashSync(req.body.senha, 10),
      adm: 0,
    };

    // Cria o usuario no json User.createUser(userToCreate);
    const resultado = await Usuario.create(userToCreate);
    console.log(resultado);
    res.redirect("/login");
  },

  //Login
  showLogin(req, res) {
    res.render("login");
  },

  async login(req, res) {
    const { email, senha } = req.body;

    const user = await Usuario.findOne({
      where: {
        email: email,
      },
    });

    //Não encontrou o user retorna
    //Temporário até eu puxar a criação de usuário para o banco ** bcrypt.compareSync(senha, user.senha)

    if (user && bcrypt.compareSync(senha, user.dataValues.senha)) {
      //Caso ele já esteja logado desloga antes de fazer o login
      if (res.locals.isLogged) userController.logOut.bind(userController);

      const userData = user.dataValues;
      const userName = userData.nome.split(" ")[0];

      //Gera o token de autenticação
      const token = jwt.sign(
        { id: userData.id_usuario, email: userData.email, name: userName },
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
  async showProfile(req, res) {
    const { id } = jwt.verify(req.cookies.token, "batata");
    const userLogged = await Usuario.findByPk(id);
    res.render("perfilUsuario", { user: userLogged });
  },
};

module.exports = userController;
