const express = require("express");
const CargoController = require("../controllers/cargosController.js");

const router = express.Router();

router
  .get("/cargos", CargoController.buscaTodosCargos)
  .get("/cargos/:id", CargoController.buscaCargoPorId)
  .post("/cargos", CargoController.criaCargo)
  .post("/cargos/:id/restaurar", CargoController.restauraCargo)
  .put("/cargos/:id", CargoController.atualizaUmCargo)
  .delete("/cargos/:id", CargoController.deletaUmCargo);

module.exports = router;