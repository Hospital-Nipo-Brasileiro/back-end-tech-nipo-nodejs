const express = require("express");
const PessoasController = require("../controllers/pessoasController");

const router = express.Router();

router
  .get("/pessoas", PessoasController.buscaTodasPessoas)
  .get("/pessoas/:id", PessoasController.buscaPessoaPorId)
  .get("/pessoas/:id/infos", PessoasController.buscaInfoDePessoa)
  .post("/pessoas", PessoasController.criaUmaPessoa)
  .post("/pessoas/:id/restaurar", PessoasController.restauraUmaPessoa)
  .put("/pessoas/:id", PessoasController.atualizaUmaPessoa)
  .put("/pessoas/:id/cargo", PessoasController.atualizaCargo)
  .delete("/pessoas/:id", PessoasController.deletaUmaPessoa);

module.exports = router;