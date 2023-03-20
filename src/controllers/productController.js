const productsData = require("../database/produtos.json");
console.log(productsData)
const productController = {
  showAll(req, res) {
    res.json(productsData);
  },

  showById(req, res) {
    const idProd = Number(req.params.id)
    
    const targetProduct = productsData.find((obj) => obj.id === idProd);
    
    targetProduct ? res.render("produto", {produto:targetProduct}) : res.status(404).send("Produto não encontrado");
  }

}

module.exports = productController;