//Pacotes
const jwt = require("jsonwebtoken");
//Model
const {Usuario} = require("../models");


async function authAdm(req, res, next) {
  const { id: id_usuario } = jwt.verify(req.cookies.token, "batata");

  const usuario = await Usuario.findOne({where: {id_usuario}});

  if(usuario.adm) {
    return next();
  }else {
    res.send("Acesso negado");
  }
}

module.exports = authAdm;