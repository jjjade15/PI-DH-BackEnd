const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  //Verifica a autenticação através do cookie
  if (req.cookies.token) {
    try {
      jwt.verify(req.cookies.token, "batata");
      return next();
    } catch (error) {
      res.render("login", { errors: error });
    }
  } 
  //Caso não esteja logado
  else {

    res.render("login", { errors: [{ msg: "Usuário não autenticado" }] });
  }
};

module.exports = auth;
