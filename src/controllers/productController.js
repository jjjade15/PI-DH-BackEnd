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
        produtosMaiorP.sort((a, b) => b.price - a.price);

        return res.render("produtos", { produtos: produtosMaiorP });
      }
      if (queryP === "menorp") {
        const produtosMenorP = [...productsData];
        produtosMenorP.sort((a, b) => a.price - b.price);

        return res.render("produtos", { produtos: produtosMenorP });
      }
    }

    return res.render("produtos", { produtos: productsData });
  },

  showById(req, res) {
    const idProd = Number(req.params.id);
    const targetProduct = productsData.find((obj) => obj.id === idProd);

    //Pega as imagens no caminho

    targetProduct
      ? res.render("produto", { produto: targetProduct })
      : res.status(404).send("Produto não encontrado");
  },
  showCreateProduct(req, res) {
    res.render("adicionarProduto");
  },
  sendById(req, res) {
    const idProd = Number(req.params.id);
    const targetProduct = productsData.find((obj) => obj.id === idProd);
    res.json(targetProduct);
  },
  //Cria produto
  createProduct(req, res) {
    console.log(req.body);

    //
    res.render("adicionarProduto");
  }
};

module.exports = productController;
