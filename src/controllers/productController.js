const { render } = require("ejs");
const { query } = require("express");
const fs = require("fs");
const path = require("path");

const productsData = require("../database/produtos.json");


//Decidi criar funções externas pro controller pra ficar mais organizado e não repetir código
function getProductById(id) {
  const idProd = Number(id);
  const targetProduct = productsData.find((obj) => obj.id === idProd);

  return targetProduct;
}

function formatImagesPath(filesArray) {
  /*
    Função que retorna a array the imagens, isso possibilita adicionar várias imagens ao mesmo tempo com o produto
  */
  return filesArray.map((file) => {
    let caminhoImg = file.path.replace(/public/g, "");
    caminhoImg = caminhoImg.replace(/\\/g, "/");

    return caminhoImg;
  });
}

function atualizaBanco() {
  //Reescreve o arquivo json
  const filePath = path.join(__dirname, "../database/produtos.json"); //Acha o caminho do produtos.json
  fs.writeFileSync(filePath, JSON.stringify(productsData)); //Reescreve o arquivo agora com o produto adicionado
}

function deleteProductImages(prodId) {
  prodId = Number(prodId);

  const pIndex = productsData.findIndex((prod) => prod.id === prodId);

  //Remove as imagens antigas e o produto antigp
  productsData[pIndex].imagens.forEach((imgCam) => {
    imgPath = path.join(__dirname, "../../public", imgCam);
    fs.unlinkSync(imgPath);
  });

}

const productController = {
  //Views
  showAll(req, res) {
    let produtosFiltrados = [...productsData];

    //Mudar esses filtros para uma função separada acho que vai ficar melhor
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

  showById: function (req, res) {
    const targetProduct = getProductById(req.params.id);

    targetProduct
      ? res.render("produto", { produto: targetProduct })
      : res.status(404).render("404");
  },

  showCreateProduct(req, res) {
    res.render("adicionarProduto");
  },

  showUpdateProduct(req, res) {
    const targetProduct = getProductById(req.params.id);
    res.render("editarProduto", { produto: targetProduct });
  },

  sendById(req, res) {
    const targetProduct = getProductById(req.params.id);
    res.json(targetProduct);
  },

  sendProductImage(req, res) {
    const targetProduct = getProductById(req.params.id);
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
    /* Adiciona as propriedades no produto */

    //Adiciona o id no produto
    produto.id = productsData.length + 1;
    //Adiciona preço no produto
    produto.price = Number(produto.price);
    //Adiciona a array de imagens formatada anteriormente no mutler
    produto.imagens = formatImagesPath(req.files);
    //Adiciona o produto no objeto de produtos geral
    productsData.push(produto);
    
    atualizaBanco();
    //Atualiza a página
    res.redirect(302, "/criarproduto");
  },

  updateProduct(req, res) {
    /* FAZER A EDIÇÃO DA IMAGEM OPICIONAL */
    //Produto a ser modificado
    const produtoMod = getProductById(req.params.id);
    
    //Recebe o objeto contendo as infos do produto atualizadas
    const produtoNovo = req.body;
    //Deleta as imagens do produto velho
    deleteProductImages(produtoMod.id);

    /*
    OTIMIZAR 
    */

    //Atualiza as infos do produto 
    produtoMod.name = produtoNovo.name;
    produtoMod.price = Number(produtoNovo.price); //Atualiza o preço
    produtoMod.imagens = formatImagesPath(req.files); //Atualiza as imagens
    produtoMod.description = produtoNovo.description; //Atualiza a descrição
    produtoMod.departamento = produtoNovo.departamento; //Atualiza o departamento
    produtoMod["sub-departamento"] = produtoNovo["sub-departamento"]; //Atualiza o sub-departamento

    //Atualiza o banco com o produto modificado
    atualizaBanco();

    res.redirect(301, `/editarproduto/${produtoMod.id}`);
  },
  deleteProduct(req, res) {
    id = Number(req.params.id);

    //Retorna caso o produto não exista
    if (pIndex === -1) {
      return res.status(404).send("Nenhum produto encontrado");
    }

    deleteProductImages(productsData[pIndex].id);

    //Deleta o produto
    productsData.splice(pIndex, 1);

    atualizaBanco();

    res.send("Produto deletado com sucesso");
  },
};

module.exports = productController;
