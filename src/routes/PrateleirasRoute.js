const express = require("express");
const PrateleiraController = require("../controllers/prateleirasController.js");

const router = express.Router();

router
  .get("/prateleiras", PrateleiraController.buscaTodasPrateleiras)
  .get("/prateleiras/:id", PrateleiraController.buscaPrateleiraPorId)
  .post("/prateleiras", PrateleiraController.criaPrateleira)
  .post("/prateleiras/:id/restaurar", PrateleiraController.restauraPrateleira)
  .put("/prateleiras/:id", PrateleiraController.atualizaUmPrateleira)
  .delete("/prateleiras/:id", PrateleiraController.deletaUmPrateleira);

module.exports = router;