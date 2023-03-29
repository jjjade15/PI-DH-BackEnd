const { render } = require("ejs");
const { query } = require("express");
const fs = require("fs");
const path = require("path");

const productsData = require("../database/produtos.json");

const productController = {
  //Mostra todos os produtos e envia os filtros deles
  showAll(req, res) {
      let produtosFiltrados = [...productsData]

    if (req.query.order) {
      const queryP = req.query.order;

      if (queryP === "maiorp") {
        
        produtosFiltrados.sort((a, b) => b.price - a.price);

        
      }
      if (queryP === "menorp") {
        
        produtosFiltrados.sort((a, b) => a.price - b.price);

        
      }
    }
    if(req.query.fabricante){
      produtosFiltrados = produtosFiltrados.filter((prod) =>{
        if(prod.fabricante == req.query.fabricante){
          return prod
        }
      })
    }
    return res.render("produtos", { produtos: produtosFiltrados });
  },

  showById(req, res) {
    const idProd = Number(req.params.id);
    const targetProduct = productsData.find((obj) => obj.id === idProd);

    //Pega as imagens no caminho

    targetProduct
      ? res.render("produto", { produto: targetProduct })
      : res.status(404).render("404");
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
    const produto = req.body;

    const imagensArray = req.files.map((file) => {
      let caminhoImg = file.path.replace(/public/g, "");
      caminhoImg = caminhoImg.replace(/\\/g, "/");

      return caminhoImg;
    });
    produto.price = Number(produto.price);
    produto.imagens = imagensArray;
    produto.id = productsData.length + 1;
    productsData.push(produto);
    const filePath = path.join(__dirname, "../database/produtos.json");
    fs.writeFileSync(filePath, JSON.stringify(productsData));

    res.redirect(301, "/criarproduto");
  },
};

module.exports = productController;
