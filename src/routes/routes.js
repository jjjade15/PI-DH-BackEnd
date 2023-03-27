const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController.js");
const productController = require("../controllers/productController.js"); //Controller produto
const monteSeuPcController = require("../controllers/monteSeuPcController.js");
const carrinhoController = require("../controllers/carrinhoController.js");

//Rota homepage
router.get("/", homeController.showHome)

//Rotas produto
router.get("/produto", productController.showAll);
router.get("/produto/:id", productController.showById);

//Rotas monteSeuPc
router.get("/monteseupc", monteSeuPcController.showMonteSeuPc);

//Rota para enviar o produto
router.get("/enviaprod/:id", productController.sendById);

//Rota barra de pesquisa
router.get("/busca", homeController.search);

//Rotas do carrinho
router.get("/carrinho", carrinhoController.mostraCarrinho);
router.get("/enviarimagem/:id", carrinhoController.sendProductImage);



module.exports = router;