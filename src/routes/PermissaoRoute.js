const express = require("express");
const PermissaoController = require("../controllers/permissaoController");

const router = express.Router();

router
  .get("/permissoes", PermissaoController.buscaTodasPermissoes)
  .get("/permissoes/:id", PermissaoController.buscaPermissaoPorId)
  .post("/permissoes", PermissaoController.criaUmaPermissao)
  .post("/permissoes/:id/restaurar", PermissaoController.restauraUmaPermissao)
  .put("/permissoes/:id", PermissaoController.atualizaUmaPermissao)
  .delete("/permissoes/:id", PermissaoController.deletaUmaPermissao);

module.exports = router;