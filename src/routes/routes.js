const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController.js");
const productController = require("../controllers/productController.js"); //Controller produto


//Rota homepage
router.get("/", homeController.showHome)

//Rotas produto
router.get("/produto", productController.showAll);
router.get("/produto/:id", productController.showById);

module.exports = router;