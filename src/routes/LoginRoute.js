const express = require("express");
const LoginController = require("../controllers/loginController.js");

const router = express.Router();

router
  .get("/login", LoginController.buscaTodosLogins)
  .get("/login/:id", LoginController.buscaLoginPorId)
  .post("/login/cria", LoginController.criaLogin)
  .post("/login", LoginController.login);

module.exports = router;