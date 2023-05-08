const express = require("express");
const path = require("path");


//Middlewares globais
const methodOverride = require("method-override") // métodos PUT e DELETE
const routes = require("./routes/routes.js"); // importa o módulo de rotas
const cookieParser = require("cookie-parser");
const loggedUserDataMiddleware = require("./middlewares/LoggedUserData.js");
const { sequelize } = require("./models/index.js");


const app = express(); //Cria a instância do express

app.use(cookieParser()); // Desmembra cookies
app.use(express.static(path.resolve("public"))); // Seta os arquivos da public como estáticos
app.use(express.urlencoded({ extended: false })) // captura na forma de objeto literal tudo o que vem de um formulário
app.use(methodOverride('_method')) // métodos PUT e DELETE
app.use(loggedUserDataMiddleware); //Middleware de salvar os dados do usuário logado

app.set("view engine", "ejs") // Seta o ejs como a template engine do servidor
app.set('views', path.join(__dirname, 'views')); //Seta a pasta da view engine
app.use(express.json()); // middle que transforma Json requests and objetos no req.body
app.use(routes); //usa o route importado como middleware 

//Erro 404 
app.use((req, res) => {
  res.status(404).render("404")
});

app.listen(3000, () => {
  console.log("servidor iniciado");
});
