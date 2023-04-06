const productsData = require("../database/produtos.json");

const homeController = {
  showHome(req, res) {
    res.render("index", {produtos:productsData});
  },
  search(req, res) {
    let search = req.query.keywords.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s]/g, '');
    

    let productsToSearch = productsData.filter(prod => prod.name.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s]/g, '').includes(search))
    if(productsToSearch.length === 0) return res.status(404).render("404")
    
    res.render("produtos", {produtos: productsToSearch})

  }

}

module.exports = homeController;