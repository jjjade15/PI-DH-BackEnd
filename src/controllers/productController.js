//Pacotes
const { render } = require("ejs");
const { query } = require("express");
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");

//Models
const productsData = require("../database/produtos.json");
const { Produto, Imagem } = require("../models");

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

    //Filtros
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

  showById: async function (req, res) {
    try {
      const id_produto = Number(req.params.id);
      console.log(id_produto);
      const targetProduct = await Produto.findOne({
        where: { id_produto },
        raw: true,
      });

      if (targetProduct === null) res.status(404).render("404");

      //Faz o query das imagens
      const imagens = await Imagem.findAll({
        where: { id_produto },
        raw: true,
      });
      targetProduct.Imagem = imagens;
      targetProduct.preco = Number(targetProduct.preco);

      res.render("produto", { produto: targetProduct });
    } catch (error) {
      res.status(404).render("404");
    }
  },

  showCreateProduct(req, res) {
    res.render("adicionarProduto");
  },

  showUpdateProduct(req, res) {
    const targetProduct = getProductById(req.params.id);
    res.render("editarProduto", { produto: targetProduct });
  },

  async showByDepartament(req, res) {
    const departNums = new Map([
      ["computadores", 1],
      ["hardware", 2],
      ["perifericos", 3],
      ["notebooks", 4],
      ["kit-upgrade", 5],
      ["cadeiras-gamer", 6],
      ["monitores", 7],
      ["celulares", 8],
      ["games", 9],
    ]);

    const dep = departNums.get(req.params.dep);
    console.log(dep);
    if (!dep) res.status(404).render("404"); //Caso o parâmetro da rota não seja um departamento responde com a 404

    //Fazer o query dos produtos
    try {
      const produtos = await Produto.findAll({
        where: { id_departamento: dep },
        raw: true,
      });

      //Faz o query das imagens
      for (const p of produtos) {
        const img = await Imagem.findOne({
          where: { id_produto: p.id_produto },
          raw: true,
        });
        const produto = produtos.find((p) => p.id_produto === img.id_produto);
        produto.Imagem = img;
      }

      res.render("produtos", { produtos });
    } catch (error) {
      res.status(404).render("404");
    }
  },
  // Rotas que enviam dados
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
  async createProduct(req, res) {
    const errorsVal = validationResult(req);

    if (!errorsVal.isEmpty())
      return res.render("adicionarProduto", { errorsVal: errorsVal.mapped() });

    //Recebe o objeto contendo as infos do produto
    const {
      nome,
      id_departamento,
      id_sub_departamento,
      fabricante,
      preco,
      descricao,
    } = req.body;

    //Cria o produto no banco
    try {
      const {
        dataValues: { id_produto },
      } = await Produto.create({
        nome,
        id_departamento: Number(id_departamento),
        id_sub_departamento: id_sub_departamento
          ? Number(id_sub_departamento)
          : null,
        fabricante: fabricante ? fabricante : null,
        preco,
        descricao: descricao ? descricao : null,
      });

      //Adiciona o caminho das imagens no banco
      const caminhoImagens = formatImagesPath(req.files);

      //Adiciona as imagens do produto no banco
      for (let img of caminhoImagens) {
        try {
          await Imagem.create({
            id_produto,
            caminho: img,
          });
        } catch (error) {
          console.error(error);
          return res.render("adicionarProduto", {
            error: "Erro ao adicionar imagens",
          });
        }
      }
    } catch (error) {
      return res.render("adicionarProduto", {
        error: "Produto não adicionado",
      });
    }

    //Atualiza a página
    res.render("adicionarProduto", { sucess: true });
  },

  updateProduct(req, res) {
    /* FAZER A EDIÇÃO DA IMAGEM OPICIONAL */
    //Produto a ser modificado
    const produtoMod = getProductById(req.params.id);

    //Recebe o objeto contendo as infos do produto atualizadas
    const produtoNovo = req.body;
    //Deleta as imagens do produto velho
    if (req.files.length > 0) {
      deleteProductImages(produtoMod.id);
      produtoMod.imagens = formatImagesPath(req.files); //Atualiza as imagens
    }

    /*
    OTIMIZAR 
    */

    //Atualiza as infos do produto
    produtoMod.name = produtoNovo.name;
    produtoMod.price = Number(produtoNovo.price); //Atualiza o preço
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
