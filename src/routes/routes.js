//Módulos
const express = require("express");

//Middlewares
const upload = require("../middlewares/upload.js");
const auth = require("../middlewares/auth.js"); //Middleware de autenticação, só da acesso a quem tá logado
const validarCadastro = require("../middlewares/validateUser.js");
const validarProduto = require("../middlewares/validateProduct.js");

//Controllers
const homeController = require("../controllers/homeController.js");
const productController = require("../controllers/productController.js"); //Controller produto
const monteSeuPcController = require("../controllers/monteSeuPcController.js");
const carrinhoController = require("../controllers/carrinhoController.js");
const userController = require("../controllers/userController.js");


//Código principal
const router = express.Router();

// -=-=-=-  Rotas homepage -=-=-=-  
router.get("/", homeController.showHome)
router.get("/busca", homeController.search); //Barra de pesquisa

// -=-=-=-  Rotas produto -=-=-=-  
//get
router.get("/departamento/:dep", productController.showByDepartament);
router.get("/produto/:id", productController.showById);
router.get("/criarproduto", auth, productController.showCreateProduct)
router.get("/editarproduto/:id", auth, productController.showUpdateProduct);
router.get("/enviarimagem/:id", productController.sendProductImage); // Envia img produto

//post
router.post("/criarproduto", auth, upload.any(), validarProduto, productController.createProduct);
//put
router.put("/produto/:id", auth, upload.any(), productController.updateProduct);
//delete
router.delete("/produto/:id", auth, productController.deleteProduct);

// -=-=-=-  Rotas monteSeuPc -=-=-=-  
router.get("/monteseupc", monteSeuPcController.showMonteSeuPc);
router.get("/monteseupc/:dep", monteSeuPcController.sendProductByDep);
//Rota para enviar o produto
router.get("/enviaprod/:id", productController.sendById);

// -=-=-=- Rotas do carrinho -=-=-=-  
router.get("/carrinho", carrinhoController.mostraCarrinho);

// -=-=-=-  Rotas usuário -=-=-=-  
//Rota Cadastro
router.get("/cadastro", userController.showCadastro);

 //validações backend cadastro
 // adicionar mais validações para todos os campos do cadastro e login


router.post("/cadastro", validarCadastro, userController.cadastro);

//Rota Login
router.get("/login", auth, userController.showLogin)
router.post("/login", userController.login)
//Rota LogOut
router.get("/logout", auth, userController.logOut);
//Rota Perfil
router.get("/minha-conta", auth, userController.showProfile)


const {check, validationResult} = require("express-validator");
router.post("/rotateste", [check("numero").isNumeric().withMessage("Não é um número carai")],(req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty())
    res.json(errors);
  
  else res.send("Sem erros");
})

module.exports = router;