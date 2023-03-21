const productsData = require("../database/produtos.json");


const productController = {
  showAll(req, res) {
    res.json(productsData);
  },

  showById(req, res) {
    const idProd = Number(req.params.id)
    const targetProduct = productsData.find((obj) => obj.id === idProd);
    
    //Pega as imagens no caminho
 


    targetProduct ? res.render("produto", {produto:targetProduct}) : res.status(404).send("Produto não encontrado");
  }

}

module.exports = productController;