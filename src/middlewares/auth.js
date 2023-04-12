const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  //Verifica a autenticação através do cookie
  if (req.cookies.token) {
    try {
      jwt.verify(req.cookies.token, "batata");
      return next();
    } catch (error) {
      console.log(error);
      res.render("login", { errors: error });
    }
  } 
  //Caso não esteja logado
  else {
    console.log("Usuário não autenticado");
    res.render("login", { errors: [{ msg: "Usuário não autenticado" }] });
  }
};

module.exports = auth;
