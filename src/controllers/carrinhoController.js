//Pacotes
const { Op } = require("sequelize"); //Módulo de operadores sequelize
const jwt = require("jsonwebtoken");

//Models
const { Carrinho, Item_carrinho, Produto, Imagem } = require("../models");

const carrinho = {
  async mostraCarrinho(req, res) {
    //Carrinho para usuario logado
    if (res.locals.isLogged) {
      const { id: id_usuario } = jwt.verify(req.cookies.token, "batata");
      const userCarrinho = await Carrinho.findOne({
        where: { id_usuario },
        raw: true,
      });
      let produtosCarrinho = await Item_carrinho.findAll({
        where: { id_carrinho: userCarrinho.id_carrinho },
        raw: true,
      });
      console.log(produtosCarrinho)
      idProdutos = produtosCarrinho.map((p) => p.id_produto);

      const produtos = await Produto.findAll({
        where: {
          id_produto: {
            [Op.in]: idProdutos
          },
        },
        raw:true
      });

      //Adiciona a imagem e quantidade em cada produto
      for(let p of produtos){
        const itemAlvo = produtosCarrinho.find(prod => prod.id_produto == p.id_produto);
        p.quantidade = itemAlvo.quantidade; 

        const img = await Imagem.findOne({
          where: { id_produto: p.id_produto },
          raw: true,
        });
        p.Imagem = img

      }

      res.render("carrinho", { produtos });
    }else res.redirect(301, "/login")
  },
  async adicionaProduto(req, res) {
    const { id: id_usuario } = jwt.verify(req.cookies.token, "batata");
    const { id_produto } = req.body;

    try {
      const userCarrinho = await Carrinho.findOne({
        where: { id_usuario },
        raw: true,
      });

      //Verifica se o item já está no carrinho
      const item = await Item_carrinho.findOne({
        where: {
          [Op.and]: {
            id_produto,
            id_carrinho: userCarrinho.id_carrinho,
          },
        },
      });
      console.log(item);
      if (!item) {
        const itemNovo = {
          id_produto,
          id_carrinho: userCarrinho.id_carrinho,
          quantidade: 1,
        };

        try {
          const produtoAdd = await Item_carrinho.create(itemNovo);
          console.log(produtoAdd);
          res.send("Produto Criado com sucesso");
        } catch (error) {
          res.send("erro ao criar o produto");
        }
      } else res.send("produto já existente");
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = carrinho;
