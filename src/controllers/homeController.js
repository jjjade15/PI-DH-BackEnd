const { Op } = require("sequelize");
const { Produto, Imagem } = require("../models");

const homeController = {
  async showHome(req, res) {
    /* Otimizar depois, tentar pegar as imagens e o produto em um só query 
      Criar o json com os produtos da home
    */

    //Faz o query de todos os produtos
    try {
      const dadosProdutos = await Produto.findAll({
        raw: true,
      });
      //Faz o query das imagens
      let x = 0
      for (const p of dadosProdutos) {
        
        const img = await Imagem.findOne({
          where: { id_produto: p.id_produto },
          raw: true,
        });
        p.Imagem = img.caminho;
      }
      console.log(dadosProdutos)
      res.render("index", { produtos: dadosProdutos });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  async search(req, res) {
    let search = req.query.keywords
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/g, "");

    try {
      const productsToSearch = await Produto.findAll({
        where: {
          nome: {
            [Op.substring]: search,
          },
        },
        raw: true,
      });

      if (productsToSearch.length === 0) res.status(404).render("404");

      //Adiciona as imagens pros produtos puxados
      for (const p of productsToSearch) {
        const img = await Imagem.findOne({
          where: { id_produto: p.id_produto },
          raw: true,
        });
        const produto = productsToSearch.find((p) => p.id_produto === img.id_produto);
        produto.Imagem = img;
      }

      res.render("produtos", { produtos: productsToSearch });
    } catch (error) {
      console.error(error);
      res.status(404).render("404");
    }
  },
};

module.exports = homeController;
