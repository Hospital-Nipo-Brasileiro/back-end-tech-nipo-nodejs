const express = require("express");
const EstoqueController = require("../controllers/estoquesController.js");

const router = express.Router();

router
  .get("/estoques", EstoqueController.buscaTodosEstoques)
  .get("/estoques/:id", EstoqueController.buscaEstoquePorId)
  .post("/estoques", EstoqueController.criaEstoque)
  .post("/estoques/:id/restaurar", EstoqueController.restauraEstoque)
  .put("/estoques/:id", EstoqueController.atualizaUmEstoque)
  .delete("/estoques/:id", EstoqueController.deletaUmEstoque);

module.exports = router;