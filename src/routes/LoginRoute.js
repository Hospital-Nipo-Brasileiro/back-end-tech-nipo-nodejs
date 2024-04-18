const express = require("express");
const LoginController = require("../controllers/loginController.js");

const router = express.Router();

router
  .get("/login", LoginController.buscaTodosLogins)
  .get("/login/:id", LoginController.buscaLoginPorId)
  .get("/login/:id/infos", LoginController.buscaPessoaPorLogin)
  .post("/login/cria", LoginController.criaLogin)
  .post("/login/:id/restaurar", LoginController.restauraUsuario)
  .post("/valida-permissao", LoginController.validaPermissao)
  .put("/login/:id", LoginController.atualizaUmLogin)
  .put("/login/:id/altera", LoginController.alteraSenha)
  .put("/login/:id/reset", LoginController.resetaSenha)
  .delete("/login/:id", LoginController.desativaLogin);

module.exports = router;