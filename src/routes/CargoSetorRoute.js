const express = require("express");
const CargoSetorController = require("../controllers/cargosSetoresController.js");

const router = express.Router();

router
  .get("/cargos-setor", CargoSetorController.buscaTodosCargosSetores)
  .get("/cargos-setor/:cargoId/cargo", CargoSetorController.buscaCargoSetorPorCargo)
  .get("/cargos-setor/:setorId/setor", CargoSetorController.buscaCargoSetorPorSetor)
  .get("/cargos-setor/:id", CargoSetorController.buscaCargoSetorPorId)
  .post("/cargos-setor", CargoSetorController.criaCargoSetor)
  .post("/cargos-setor/:id/restaurar", CargoSetorController.restauraCargoSetor)
  .put("/cargos-setor/:id", CargoSetorController.atualizaUmCargoSetor)
  .delete("/cargos-setor/:id", CargoSetorController.deletaUmCargoSetor);

module.exports = router;