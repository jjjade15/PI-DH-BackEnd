//Pacotes
const { render } = require("ejs");
const { query } = require("express");
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const { Op } = require("sequelize"); //Módulo de operadores sequelize

//Models
const productsData = require("../database/produtos.json");
const { Produto, Imagem } = require("../models");

//Funções externas para o controller
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

function deleteImages(imagesPaths) {
  //Remove as imagens antigas
  imagesPaths.forEach((imgCam) => {
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

    console.log(req.headers.referer);
    req.headers.referer 
      ? res.render("adicionarproduto", { sucess: true })
      : res.render("adicionarproduto");
  },

  async showUpdateProduct(req, res) {
    try {
      const id = Number(req.params.id);
      const produto = await Produto.findOne({
        where: { id_produto: id },
        raw: true,
      });

      if (!produto) throw new Error("Produto não encontrado");

      req.headers.referer 
        ? res.render("editarProduto", { produto: produto, sucess: true })
        : res.render("editarProduto", { produto: produto });
    } catch (error) {
      res.status(404).render("404");
    }
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

    const subDepartNums = new Map([
      ["pc-gamer", 1],
      ["pc-escritorio", 2],
      ["pc-casual", 3],
      ["processador", 4],
      ["placa-de-video", 5],
      ["placa-mae", 6],
      ["memoria", 7],
      ["armazenamento", 8],
      ["refrigeramento", 9],
      ["teclado", 10],
      ["mouse", 11],
      ["fone", 12],
      ["headset", 13],
      ["webcam", 14],
      ["macbook", 15],
      ["notebook-gamer", 16],
      ["notebook-escritorio", 17],
    ]);

    const dep = departNums.get(req.params.dep);

    if (!dep) res.status(404).render("404"); //Caso o parâmetro da rota não seja um departamento responde com a 404

    //Fazer o query dos produtos
    try {
      let produtos;
      //Caso seja um query de um subdepartamento
      if (req.params.subdep) {
        console.log("Entrou aqui");

        const subdep = subDepartNums.get(req.params.subdep);

        if (!subdep) throw new Error("Sub departamento não encontrado"); //Da erro caso ele não encontre o sub departamento

        produtos = await Produto.findAll({
          where: {
            [Op.and]: {
              id_departamento: dep,
              id_sub_departamento: subdep,
            },
          },
          raw: true,
        });
      } else {
        produtos = await Produto.findAll({
          where: { id_departamento: dep },
          raw: true,
        });
      }

      //Verifica se achou algum produto, caso contrário manda pra 404
      if (produtos.length == 0)
        throw new Error("Nenhum produto encontrado nesse departamento");

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
      console.error(error);
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

    //Adiciona o caminho das imagens no banco
    const caminhoImagens = formatImagesPath(req.files);

    if (!errorsVal.isEmpty()) {
      deleteImages(caminhoImagens);
      return res.render("adicionarProduto", { errorsVal: errorsVal.mapped() });
    }

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
      //Atualiza a página

      res.redirect(301, `/criarproduto`);
    } catch (error) {
      console.error(error);
      return res.render("adicionarProduto", {
        error: "Produto não adicionado",
      });
    }
  },

  async updateProduct(req, res) {
    /* FAZER A EDIÇÃO DA IMAGEM OPICIONAL */
    //Produto a ser modificado
    try {
      const id = Number(req.params.id);

      const dadosProduto = await Produto.findOne({
        where: { id_produto: id },
        raw: true,
      });

      const errorsVal = validationResult(req);
      const caminhoImagens = formatImagesPath(req.files);

      if (!errorsVal.isEmpty()) {
        console.log(errorsVal.mapped());
        deleteImages(caminhoImagens);
        return res.render("adicionarProduto", {
          errorsVal: errorsVal.mapped(),
          produto: dadosProduto,
        });
      }

      if (!dadosProduto) throw new Error("Produto não encontrado");

      const produtoNovo = {
        ...req.body,
        fabricante: req.body.fabricante ? req.body.fabricante : null,
        descricao: req.body.descricao ? req.body.descricao : null,
      };

      const resultado = await Produto.update(produtoNovo, {
        where: { id_produto: id },
      });

      //caso tenha imagens ele deleta as imagens antigas no banco e no diretório e adiciona as novas imagens
      if (req.files.length > 0) {
        const imagens = await Imagem.findAll({
          where: { id_produto: id },
          raw: true,
        });

        //Deleta as imagens do diretório
        imagens.forEach((img) => {
          imgPath = path.join(__dirname, "../../public", img.caminho);
          fs.unlinkSync(imgPath);
        });

        //Deleta as imagens do banco
        const resultadoImg = await Imagem.destroy({
          where: { id_produto: id },
        });

        //Adiciona as imagens do produto no banco

        for (let img of caminhoImagens) {
          await Imagem.create({
            id_produto: id,
            caminho: img,
          });
        }
      }

      res.redirect(301, `/editarproduto/${id}`);
    } catch (error) {
      console.log(error);
      res.send("Produto não editado, tente novamente mais tarde");
    }

    /*
    OTIMIZAR 
    */
  },

  async deleteProduct(req, res) {
    // LEMBRA DE DESTRUIR TAMBÉM NAS TABELAS DO CARRINHO QUANDO ESTIVER PRONTA

    try {
      const id = Number(req.params.id);

      const imagens = await Imagem.findAll({
        where: { id_produto: id },
        raw: true,
      });

      imagens.forEach((img) => {
        imgPath = path.join(__dirname, "../../public", img.caminho);
        fs.unlinkSync(imgPath);
      });

      const resultadoImg = await Imagem.destroy({ where: { id_produto: id } });
      const resultadoProd = await Produto.destroy({
        where: { id_produto: id },
      });

      res.send("deletado");
    } catch (error) {
      console.log(error);
      res.send("erro");
    }
  },
};

module.exports = productController;
