const express = require("express");
const ItemController = require("../controllers/itensController");
const ItemGuardadoController = require("../controllers/itemGuardadoController");

const router = express.Router();

router
  .get("/itens", ItemController.buscaTodosItens)
  .get("/itens/:id", ItemController.buscaItemPorId)
  .post("/itens", ItemController.criaUmItem, ItemGuardadoController.guardaNaTriagem)
  .post("/itens/:id/restaurar", ItemController.restauraUmItem)
  .put("/itens/:id", ItemController.atualizaUmItem)
  .delete("/itens/:id", ItemController.deletaUmItem);

module.exports = router;