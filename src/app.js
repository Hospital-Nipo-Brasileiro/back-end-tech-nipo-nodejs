const express = require("express");
const routes = require("./routes/index.js");
const manipulador404 = require("./middlewares/manipulador404.js");
const manipuladorDeErros = require("./middlewares/manipuladorDeErros.js");
const verifyToken = require("./middlewares/autenticador.js");
const extractUserId = require("./middlewares/autenticador.js");
const cors = require("cors");
const LoginController = require("./controllers/loginController.js");

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", 
  credentials: true, 
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use(express.Router().post("/login", LoginController.login));
app.use(verifyToken);
app.use(extractUserId);

routes(app);

app.use(manipulador404);
app.use(manipuladorDeErros);

module.exports = app;