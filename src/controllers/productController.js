const { render } = require("ejs");
const { query } = require("express");
const fs = require("fs");
const path = require("path");

const productsData = require("../database/produtos.json");
const { pid } = require("process");

const productController = {
  //Mostra todos os produtos e envia os filtros deles
  showAll(req, res) {
    let produtosFiltrados = [...productsData];

    if (req.query.order) {
      const queryP = req.query.order;

      if (queryP === "maiorp") {
        produtosFiltrados.sort((a, b) => b.price - a.price);
      }
      if (queryP === "menorp") {
        produtosFiltrados.sort((a, b) => a.price - b.price);
      }
    }
    if (req.query.fabricante) {
      produtosFiltrados = produtosFiltrados.filter((prod) => {
        if (prod.fabricante == req.query.fabricante) {
          return prod;
        }
      });
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
  showUpdateProduct(req, res) {
    const idProd = Number(req.params.id);
    const targetProduct = productsData.find((obj) => obj.id === idProd);

    res.render("editarProduto", { produto: targetProduct });
  },
  sendById(req, res) {
    const idProd = Number(req.params.id);
    const targetProduct = productsData.find((obj) => obj.id === idProd);
    res.json(targetProduct);
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

  //CRUDS POST, PUT, DELETE

  //POST
  createProduct(req, res) {
    //Recebe o objeto contendo as infos do produto
    const produto = req.body;

    //Adiciona o id no produto
    produto.id = productsData.length + 2;

    //Formata o caminho das imagens do mutler e adiciona em uma array de imagens
    const imagensArray = req.files.map((file) => {
      let caminhoImg = file.path.replace(/public/g, "");
      caminhoImg = caminhoImg.replace(/\\/g, "/");

      return caminhoImg;
    });

    //Adiciona preço no produto
    produto.price = Number(produto.price);
    //Adiciona a array de imagens formatada anteriormente no mutler
    produto.imagens = imagensArray;
    //Adiciona o produto no objeto de produtos geral
    productsData.push(produto);

    //Reescreve o arquivo json
    const filePath = path.join(__dirname, "../database/produtos.json"); //Acha o caminho do produtos.json
    fs.writeFileSync(filePath, JSON.stringify(productsData)); //Reescreve o arquivo agora com o produto adicionado

    //Atualiza a página
    res.redirect(301, "/criarproduto");
  },

  updateProduct(req, res) {
    //Recebe o objeto contendo as infos do produto
    const produto = req.body;
    produto.id = Number(req.params.id);

    //Adiciona preço no produto
    produto.price = Number(produto.price);
    //Deleta as imagens antigas do produto e coloca as novas
    const pIndex = productsData.findIndex((prod) => prod.id === produto.id);

    //Remove as imagens antigas e o produto antigp
    console.log(productsData[pIndex]);
    productsData[pIndex].imagens.forEach((imgCam) => {
      imgPath = path.join(__dirname, "../../public", imgCam);
      fs.unlinkSync(imgPath);
      console.log(imgPath);
    });
    productsData.splice(pIndex, 1);

    //Adiciona as novas imagens
    const imagensArray = req.files.map((file) => {
      let caminhoImg = file.path.replace(/public/g, "");
      caminhoImg = caminhoImg.replace(/\\/g, "/");

      return caminhoImg;
    });

    //Adiciona as propriedades ao produto
    produto.price = Number(produto.price); //Adiciona preço no produto
    produto.imagens = imagensArray;
    //Adiciona o produto no objeto de produtos geral
    console.log(produto);
    productsData.push(produto); //Adiciona o produto no objeto no servidor
    //Reescreve o banco de dados
    const filePath = path.join(__dirname, "../database/produtos.json"); //Acha o caminho do produtos.json
    fs.writeFileSync(filePath, JSON.stringify(productsData)); //Reescreve o arquivo agora com o produto adicionado

    res.redirect(301, `/editarproduto/${produto.id}`);
  },
};

module.exports = productController;
