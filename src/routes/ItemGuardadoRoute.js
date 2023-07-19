const express = require("express");
const ItemGuardadoController = require("../controllers/itemGuardadoController.js");

const router = express.Router();

router
  .get("/itens-guardados", ItemGuardadoController.buscaTodosItensGuardados)
  .get("/itens-guardados/:id", ItemGuardadoController.buscaItemGuardadoPorId)
  .post("/itens-guardados", ItemGuardadoController.guardaUmItem)
  .post("/itens-guardados/:id/restaurar", ItemGuardadoController.restauraUmItemGuardado)
  .put("/itens-guardados/:id", ItemGuardadoController.atualizaUmItemGuardado)
  .delete("/itens-guardados/:id", ItemGuardadoController.deletaUmItemGuardado);

module.exports = router;