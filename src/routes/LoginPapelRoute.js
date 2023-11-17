const express = require("express");
const LoginPapelController = require("../controllers/loginPapelController");

const router = express.Router();

router
  .get("/logins-papeis", LoginPapelController.buscaTodosLoginsPapeis)
  .get("/logins-papeis/:id", LoginPapelController.buscaLoginPapelPorIdLogin)
  .post("/logins-papeis/:id/vincula", LoginPapelController.vinculaPapelLogin)
  .post("/logins-papeis/:id/restaurar", LoginPapelController.restauraUmLoginPapel)
  .delete("/papeis-permissoes/:id", LoginPapelController.restauraUmLoginPapel);

module.exports = router;