const express = require("express");
const PessoasController = require("../controllers/pessoasController");

const router = express.Router();

router
  .get("/pessoas", PessoasController.buscaTodasPessoas)
  .get("/pessoas/:id", PessoasController.buscaPessoaPorId)
  .post("/pessoas", PessoasController.criaUmaPessoa)
  .post("/pessoas/:id/restaurar", PessoasController.restauraUmaPessoa)
  .put("/pessoas/:id", PessoasController.atualizaUmaPessoa)
  .delete("/pessoas/:id", PessoasController.deletaUmaPessoa);

module.exports = router;