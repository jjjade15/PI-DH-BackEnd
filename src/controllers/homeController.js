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
      for (const p of dadosProdutos) {
        const img = await Imagem.findOne({
          where: { id_produto: p.id_produto },
          raw: true,
        });
        const produto = dadosProdutos.find(
          (p) => p.id_produto === img.id_produto
        );
        produto.Imagem = img;
      }

      res.render("index", { produtos: dadosProdutos });
    } catch (error) {
      res.send("Erro ao puxar os objetos");
    }
  },
  search(req, res) {
    let search = req.query.keywords
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/g, "");

    let productsToSearch = productsData.filter((prod) =>
      prod.name
        .toLocaleLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s]/g, "")
        .includes(search)
    );
    if (productsToSearch.length === 0) return res.status(404).render("404");

    res.render("produtos", { produtos: productsToSearch });
  },
};

module.exports = homeController;
