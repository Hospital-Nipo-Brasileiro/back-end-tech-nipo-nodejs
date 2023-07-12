const express = require("express");
const SistemaController = require("../controllers/sistemasController.js");

const router = express.Router();

router
  .get("/sistemas", SistemaController.buscaTodosSistemas)
  .get("/sistemas/:id", SistemaController.buscaSistemaPorId)
  .post("/sistemas", SistemaController.criaSistema)
  .post("/sistemas/:id/restaurar", SistemaController.restauraSistema)
  .put("/sistemas/:id", SistemaController.atualizaUmSistema)
  .delete("/sistemas/:id", SistemaController.deletaUmSistema);

module.exports = router;