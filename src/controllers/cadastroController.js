const cadastroController = {
    showCadastro(req,res){
        res.render("cadastro")
    },

    cadastro(req,res){
        console.log(req.body)
        res.send("teste")
    }
}

module.exports = cadastroController;