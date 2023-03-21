const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController.js");
const productController = require("../controllers/productController.js"); //Controller produto
const monteSeuPcController = require("../controllers/monteSeuPcController.js");

//Rota homepage
router.get("/", homeController.showHome)

//Rotas produto
router.get("/produto", productController.showAll);
router.get("/produto/:id", productController.showById);

//Rotas monteSeuPc
router.get("/monteseupc", monteSeuPcController.showMonteSeuPc);

module.exports = router;