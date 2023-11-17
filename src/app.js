const express = require("express");
const routes = require("./routes/index.js");
const manipulador404 = require("./middlewares/manipulador404.js");
const manipuladorDeErros = require("./middlewares/manipuladorDeErros.js");
const verifyToken = require("./middlewares/autenticador.js");
const extractUserId = require("./middlewares/autenticador.js");
const login = require("../src/routes/LoginRoute.js");
const cors = require("cors");

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000", // Defina as origens permitidas
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Defina os métodos HTTP permitidos
  credentials: true, // Permitir envio de cookies (se aplicável)
  optionsSuccessStatus: 204, // Defina o código de status de sucesso para opções pré-voo
};

app.use(cors(corsOptions));

app.use(login);
app.use(verifyToken);
app.use(extractUserId);

routes(app);

app.use(manipulador404);
app.use(manipuladorDeErros);

module.exports = app;