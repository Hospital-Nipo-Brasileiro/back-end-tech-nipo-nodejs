const express = require("express");
const SistemaPessoaController = require("../controllers/sistemaPessoaController");

const router = express.Router();

router
  .get("/sistema/pessoas", SistemaPessoaController.buscaSistemaPorTodasPessoas)
  .get("/sistemas/pessoa/:id", SistemaPessoaController.buscaSistemaPorPessoaId)
  .post("/sistemas/pessoas", SistemaPessoaController.vinculaSistemaAUmaPessoa)
  .post("/sistemas/pessoas/:id/restaurar", SistemaPessoaController.restauraUmSistemaDesvinculadoPorPessoa)
  .delete("/sistemas/pessoas/:id", SistemaPessoaController.desvinculaUmSistemaAUmaPessoa);

module.exports = router;