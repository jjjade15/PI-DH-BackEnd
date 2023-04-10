const express = require("express");
const path = require("path");
const methodOverride = require("method-override") // métodos PUT e DELETE
const session = require("express-session");

const routes = require("./routes/routes.js"); //importa o módulo de rotas


const app = express(); //Cria a instância do express

// app.use(session({
//   secret:"batata",
//   resave:"true",
//   saveUnintialized: true
// }))

app.use(express.static(path.resolve("public"))); // Seta os arquivos da public como estáticos
app.use(express.urlencoded({ extended: false })) // captura na forma de objeto literal tudo o que vem de um formulário
app.use(methodOverride('_method')) // métodos PUT e DELETE
app.set("view engine", "ejs") // Seta o ejs como a template engine do servidor
app.set('views', path.join(__dirname, 'views')); //Seta a pasta da view engine
app.use(express.json()); // middle que transforma Json requests and objetos no req.body
app.use(routes); //usa o route importado como middleware 

//Erro 404 
app.use((req, res) => {
  res.status(404).render("404")
})

app.listen(3000, () => {
  console.log("servidor iniciado");
});
