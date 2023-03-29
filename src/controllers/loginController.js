const loginController = {
    showLogin(req,res){
        res.render("login")
    },

    login(req,res){
        console.log(req.body)
        res.send("teste") //colocar redirect para voltar para home
    }
}
module.exports = loginController;