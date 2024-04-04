const express = require("express");
const PapelController = require("../controllers/papelController");

const router = express.Router();

router
  .get("/papeis", PapelController.buscaTodosPapel)
  .get("/papeis/:id", PapelController.buscaPapelPorId)
  .get("/papeis/:id/permissoes", PapelController.buscaPermissaoPorPapel)
  .post("/papeis", PapelController.criaUmPapel)
  .post("/papeis/:id/restaurar", PapelController.restauraUmPapel)
  .put("/papeis/:id", PapelController.atualizaUmPapel)
  .delete("/papeis/:id", PapelController.deletaUmPapel);

module.exports = router;