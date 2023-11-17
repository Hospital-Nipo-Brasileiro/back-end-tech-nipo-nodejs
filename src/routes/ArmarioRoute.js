const express = require("express");
const ArmarioController = require("../controllers/armariosController.js");

const router = express.Router();

router
  .get("/armarios", ArmarioController.buscaTodosArmarios)
  .get("/armarios/:id", ArmarioController.buscaArmarioPorId)
  .post("/armarios", ArmarioController.criaArmario)
  .post("/armarios/:id/restaurar", ArmarioController.restauraArmario)
  .put("/armarios/:id", ArmarioController.atualizaUmArmario)
  .delete("/armarios/:id", ArmarioController.deletaUmArmario);

module.exports = router;