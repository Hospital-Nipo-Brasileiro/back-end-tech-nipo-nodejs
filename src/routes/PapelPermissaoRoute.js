const express = require("express");
const PapelPermissaoController = require("../controllers/papelPermissaoController.js");

const router = express.Router();

router
  .get("/papeis-permissoes", PapelPermissaoController.buscaTodosPapeisPermissoes)
  .get("/papeis-permissoes/:id", PapelPermissaoController.buscaPapelPermissaoPorId)
  .post("/papeis-permissoes", PapelPermissaoController.vinculaUmaPermissaoAUmPapel)
  .post("/papeis-permissoes/:id/restaurar", PapelPermissaoController.restauraUmPapelPermissao)
  .delete("/papeis-permissoes/:id", PapelPermissaoController.desvinculaUmaPermissaoAUmPapel);

module.exports = router;