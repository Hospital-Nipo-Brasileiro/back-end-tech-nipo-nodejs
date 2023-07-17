const express = require("express");
const BauController = require("../controllers/bausController.js");

const router = express.Router();

router
  .get("/baus", BauController.buscaTodosBaus)
  .get("/baus/:id", BauController.buscaBauPorId)
  .post("/baus", BauController.criaBau)
  .post("/baus/:id/restaurar", BauController.restauraBau)
  .put("/baus/:id", BauController.atualizaUmBau)
  .delete("/baus/:id", BauController.deletaUmBau);

module.exports = router;