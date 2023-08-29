const express = require("express");
const PapelController = require("../controllers/papelController");

const router = express.Router();

router
  .get("/papeis", PapelController.buscaTodosPapel)
  .get("/papeis/:id", PapelController.buscaPapelPorId)
  .post("/papeis", PapelController.criaUmPapel)
  .post("/papeis/:id/vincula", PapelController.vinculaPermissaoAoPapel)
  .post("/papeis/:id/restaurar", PapelController.restauraUmPapel)
  .put("/papeis/:id", PapelController.atualizaUmPapel)
  .delete("/papeis/:id", PapelController.deletaUmPapel);

module.exports = router;