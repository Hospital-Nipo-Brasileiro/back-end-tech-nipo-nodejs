const express = require("express");
const SetorController = require("../controllers/setoresController.js");

const router = express.Router();

router
  .get("/setores", SetorController.buscaTodosSetores)
  .get("/setores/:id", SetorController.buscaSetorPorId)
  .post("/setores", SetorController.criaSetor)
  .post("/setores/:id/restaurar", SetorController.restauraSetor)
  .put("/setores/:id", SetorController.atualizaUmSetor)
  .delete("/setores/:id", SetorController.deletaUmSetor);

module.exports = router;