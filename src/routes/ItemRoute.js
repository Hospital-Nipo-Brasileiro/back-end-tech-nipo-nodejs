const express = require("express");
const ItemController = require("../controllers/itensController");

const router = express.Router();

router
  .get("/itens", ItemController.buscaTodosItens)
  .get("/itens/:id", ItemController.buscaItemPorId)
  .get("/estoques/:estoqueId/itens", ItemController.buscaItemPorEstoque)
  .post("/itens", ItemController.criaUmItem)
  .post("/itens/:id/restaurar", ItemController.restauraUmItem)
  .put("/itens/:id", ItemController.atualizaUmItem)
  .delete("/itens/:id", ItemController.deletaUmItem);

module.exports = router;