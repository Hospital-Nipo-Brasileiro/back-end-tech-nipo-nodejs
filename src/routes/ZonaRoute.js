const express = require("express");
const ZonaController = require("../controllers/zonasController.js");

const router = express.Router();

router
  .get("/zonas", ZonaController.buscaTodasZonas)
  .get("/zonas/:id", ZonaController.buscaZonaPorId)
  .post("/zonas", ZonaController.criaZona)
  .post("/zonas/:id/restaurar", ZonaController.restauraZona)
  .put("/zonas/:id", ZonaController.atualizaUmZona)
  .delete("/zonas/:id", ZonaController.deletaUmZona);

module.exports = router;