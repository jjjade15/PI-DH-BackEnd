//Pacotes
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Models
const { Usuario } = require("../models");
const { Endereco } = require("../models");


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
      errors.errors.push({ msg: "Email já existente" });
    }
    if (cpfExist) {
      errors.errors.push({ msg: "CPF já existente" });
    }

    //Verifica se existem erros no express validator
    if (!errors.isEmpty()) {
      return res.render("cadastro", { errors: errors.mapped() });
    }

    //Cria o cadastro caso não tenha erros

    const {
      nome,
      email,
      cpf,
      data_nasc,
      telefone,
      cep,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      senha,
    } = req.body;

    const userInfo = {
      nome,
      email,
      cpf,
      data_nasc,
      telefone,
      senha: bcrypt.hashSync(senha, 10), //Faz o hash da senha
      adm: 0,
    };

    await Usuario.create(userInfo);

    //Pega o ID do usuário criado através do email
    const {dataValues:{id_usuario}} = await Usuario.findOne({where: {email: email}});

    const userAdress = {
      id_usuario,
      cep,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
    };

    //Cria a fileira do endereço daquele usuário
    await Endereco.create(userAdress);

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

  //Perfil usuário
  async showProfile(req, res) {
    const { id } = jwt.verify(req.cookies.token, "batata");
    const userLogged = await Usuario.findByPk(id);
    res.render("perfilUsuario", { user: userLogged });
  },
};

module.exports = userController;
