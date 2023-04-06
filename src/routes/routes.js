//Módulos
const express = require("express");

//Middlewares
const upload = require("../middlewares/upload.js");

//Controllers
const homeController = require("../controllers/homeController.js");
const productController = require("../controllers/productController.js"); //Controller produto
const monteSeuPcController = require("../controllers/monteSeuPcController.js");
const carrinhoController = require("../controllers/carrinhoController.js");
const userController = require("../controllers/userController.js");


//Código principal
const router = express.Router();

//Rota homepage
router.get("/", homeController.showHome)

//Rotas produto
//get
router.get("/produto", productController.showAll);
router.get("/produto/:id", productController.showById);
router.get("/criarproduto", productController.showCreateProduct)
router.get("/editarproduto/:id", productController.showUpdateProduct);
router.get("/enviarimagem/:id", productController.sendProductImage); // Envia img produto
//post
router.post("/criarproduto", upload.any(), productController.createProduct);
//put
router.put("/produto/:id", upload.any(), productController.updateProduct);
//delete

//Rotas monteSeuPc
router.get("/monteseupc", monteSeuPcController.showMonteSeuPc);
router.get("/monteseupc/:dep", monteSeuPcController.sendProductByDep);
//Rota para enviar o produto
router.get("/enviaprod/:id", productController.sendById);

//Rota barra de pesquisa
router.get("/busca", homeController.search);

//Rotas do carrinho
router.get("/carrinho", carrinhoController.mostraCarrinho);


//Rota Cadastro
router.get("/cadastro", userController.showCadastro)
router.post("/cadastro", userController.cadastro)

//Rota Login
router.get("/login", userController.showLogin)
router.post("/login", userController.login)


module.exports = router;