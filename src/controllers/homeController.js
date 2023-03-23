const productsData = require("../database/produtos.json");

const homeController = {
  showHome(req, res) {
    
    res.render("index", {produtos:productsData});
    
  }
}

module.exports = homeController;