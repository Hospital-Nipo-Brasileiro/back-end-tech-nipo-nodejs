const express = require("express");
const SistemaPessoaController = require("../controllers/sistemaPessoaController");

const router = express.Router();

router
  .get("/sistemas/pessoas", SistemaPessoaController.buscaTodosSistemasPorPessoa)
  .get("/sistemas/pessoas/filtra", SistemaPessoaController.filtraSistemasPorUsuarios)
  .get("/sistemas/pessoas/:id", SistemaPessoaController.buscaSistemaPorIdPessoa)
  .get("/sistemas/pessoas/:id/filtra", SistemaPessoaController.filtraSistemasPorIdDeUsuarios)
  .post("/sistemas/pessoas", SistemaPessoaController.vinculaSistemaAUmaPessoa)
  .post("/sistemas/pessoas/:id/restaurar", SistemaPessoaController.restauraUmSistemaDesvinculadoPorPessoa)
  .put("/sistemas/pessoas/:id", SistemaPessoaController.atualizaUmSistemaVinculadoAUmaPessoa)
  .delete("/sistemas/pessoas/:id", SistemaPessoaController.desvinculaUmSistemaAUmaPessoa);

module.exports = router;