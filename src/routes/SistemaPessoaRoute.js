const express = require("express");
const SistemaPessoaController = require("../controllers/sistemaPessoaController");

const router = express.Router();

router
  .get("/sistemas/pessoas", SistemaPessoaController.buscaTodosSistemasPorPessoa)
  .get("/sistemas/pessoas/:id", SistemaPessoaController.buscaSistemaPorIdPessoa)
  .post("/sistemas/pessoas", SistemaPessoaController.vinculaSistemaAUmaPessoa)
  .post("/sistemas/pessoas/:id/restaurar", SistemaPessoaController.restauraUmSistemaDesvinculadoPorPessoa)
  .delete("/sistemas/pessoas/:id", SistemaPessoaController.desvinculaUmSistemaAUmaPessoa);

module.exports = router;