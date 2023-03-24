const productsData = require("../database/produtos.json");

const homeController = {
  showHome(req, res) {
    res.render("index", {produtos:productsData});
  },
  search(req, res) {
    let search = req.query.keywords.toLowerCase();
    

    let productsToSearch = productsData.filter(prod => prod.name.toLocaleLowerCase().includes(search))

    res.render("produtos", {produtos: productsToSearch})

  }

}

module.exports = homeController;