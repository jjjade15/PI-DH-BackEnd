const express = require("express");
const app = express(); //Cria a instância do express
const path = require('path');


app.use(express.static(path.resolve("public"))); // Seta os arquivos da public como estáticos
app.use(express.urlencoded({ extended: false })) // captura na forma de objeto literal tudo o que vem de um formulário


app.set("view engine", "ejs") // Seta o ejs como a template engine do servidor

app.set('views', path.join(__dirname, 'views')); //Seta a pasta da view engine

app.use(express.json()); // middle que transforma Json requests and objetos no req.body

const routes = require("./routes/routes.js"); //importa o módulo de rotas
app.use(routes); //usa o route importado como middleware 



app.listen(3000, () => {
  console.log("servidor iniciado");
});

