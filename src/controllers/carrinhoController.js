const productsData = require("../database/produtos.json");
const path = require("path");

const carrinho = {
  mostraCarrinho(req, res) {
    res.render("carrinho");
  },


};

module.exports = carrinho;
