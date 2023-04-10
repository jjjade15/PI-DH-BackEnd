const productsData = require("../database/produtos.json");

const monteSeuPcController = {
  showMonteSeuPc(req, res) {
    res.render("monteSeuPc");
  },
  sendProductByDep(req, res) {
    
    const departamento = req.params.dep.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s]/g, '');
    const produtosDep = productsData.filter((prod) => prod["sub-departamento"] === departamento);

    res.json(produtosDep);
  }
}

module.exports = monteSeuPcController;