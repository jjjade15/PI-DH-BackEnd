const productsData = require("../database/produtos.json");
const path = require("path");

const carrinho = {
  mostraCarrinho(req, res) {
    res.render("carrinho");
  },

  sendProductImage(req, res) {
    const idProd = Number(req.params.id);
    const targetProduct = productsData.find((obj) => obj.id === idProd);
    const caminhoImg = path.join(
      __dirname,
      "/../../public",
      targetProduct.imagens[0]
    );

    res.sendFile(caminhoImg);
  },
};

module.exports = carrinho;
