const express = require("express");
const routes = require("./routes/index.js");
const manipulador404 = require("./middlewares/manipulador404.js");
const manipuladorDeErros = require("./middlewares/manipuladorDeErros.js");
const verifyToken = require("./middlewares/autenticador.js");
const login = require("../src/routes/LoginRoute.js");

const app = express();
app.use(express.json());

app.use(login);

//MIDDLEWARE DE AUTENTICAÇÃO
app.use(verifyToken);


routes(app);

//MIDDLEWARE DE ERRO 404
app.use(manipulador404);

// MIDDLEWARE DE TRATAMENTO DE ERRO PERSONALIZADO
app.use(manipuladorDeErros);

module.exports = app;