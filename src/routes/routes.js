//Módulos
const express = require("express");
const multer = require("multer");

//Controllers
const homeController = require("../controllers/homeController.js");
const productController = require("../controllers/productController.js"); //Controller produto
const monteSeuPcController = require("../controllers/monteSeuPcController.js");
const carrinhoController = require("../controllers/carrinhoController.js");
const loginController = require("../controllers/loginController.js");
const cadastroController = require("../controllers/cadastroController.js");


//Código principal
const router = express.Router();

//Multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/images/productImages/multerImages');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname)
  }
})
const upload = multer({ storage: storage });


//Rota homepage
router.get("/", homeController.showHome)

//Rotas produto
//get
router.get("/produto", productController.showAll);
router.get("/produto/:id", productController.showById);
router.get("/criarproduto", productController.showCreateProduct)
//post
router.post("/criarproduto", upload.any(), productController.createProduct);

//Rotas monteSeuPc
router.get("/monteseupc", monteSeuPcController.showMonteSeuPc);

//Rota para enviar o produto
router.get("/enviaprod/:id", productController.sendById);

//Rota barra de pesquisa
router.get("/busca", homeController.search);

//Rotas do carrinho
router.get("/carrinho", carrinhoController.mostraCarrinho);
router.get("/enviarimagem/:id", carrinhoController.sendProductImage);

//Rota Cadastro
router.get("/cadastro", cadastroController.showCadastro)
router.post("/cadastro", cadastroController.cadastro)

//Rota Login
router.get("/login", loginController.showLogin)
router.post("/login", loginController.login)


module.exports = router;