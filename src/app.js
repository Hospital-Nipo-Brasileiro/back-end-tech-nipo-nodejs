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
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
  credentials: true, 
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use(login);
app.use(verifyToken);
app.use(extractUserId);

routes(app);

app.use(manipulador404);
app.use(manipuladorDeErros);

module.exports = app;