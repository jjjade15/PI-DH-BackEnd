//Módulos
const bcrypt = require("bcrypt");

//Models
const User = require("../models/User.js")

const userController = {
  //Cadastro
  showCadastro(req, res) {
    res.render("cadastro");
  },

  cadastro(req, res) {
    //Fazer as validações do express validator aqui


    //Validação de usuário já existe
    const userExist = User.getUserByField("email", req.body.email);
    if(userExist) {
      console.log("Parou aqui")
      return res.send("Email já existe");
      // return res.render("cadastro", {
      //   errors: {
      //     email: {
      //       msg: "Este email já está registrado"
      //     }
      //   },
      //   oldData: req.body
      // })
    }
    //Faz o hash da senha
    const userToCreate = {
      ...req.body,
      senha: bcrypt.hashSync(req.body.senha, 10)
    }
    
    User.createUser(userToCreate); 
    return res.send(userToCreate);
    res.redirect("/cadastro");
  },

  //Login
  showLogin(req, res) {
    res.render("login");
  },

  login(req, res) {

    const {email, senha} = req.body;

    

    res.redirect("/"); //colocar redirect para voltar para home
  },
};

module.exports = userController;