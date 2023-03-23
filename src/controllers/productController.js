const { render } = require("ejs");
const { query } = require("express");
const productsData = require("../database/produtos.json");

const productController = {
  //Mostra todos os produtos e envia os filtros deles
  showAll(req, res) {
    if (req.query.order) {
      const queryP = req.query.order;

      if (queryP === "maiorp") {
        const produtosMaiorP = [...productsData];
        produtosMaiorP.sort((a, b) => b.price - a.price)
        
        res.render("produtos", { produtos: produtosMaiorP });
      }
      if(queryP === "menorp") {
        const produtosMenorP = [...productsData];
        produtosMenorP.sort((a, b) => a.price - b.price)

        res.render("produtos", { produtos: produtosMenorP});
      }
    }

    res.render("produtos", { produtos: productsData });
  },

  showById(req, res) {
    const idProd = Number(req.params.id);
    const targetProduct = productsData.find((obj) => obj.id === idProd);

    //Pega as imagens no caminho

    targetProduct
      ? res.render("produto", { produto: targetProduct })
      : res.status(404).send("Produto não encontrado");
  },

  filter(req, res) {
    res.json(productsData);
  },
};

module.exports = productController;
