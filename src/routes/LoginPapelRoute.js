const express = require("express");
const LoginPapelController = require("../controllers/loginPapelController");

const router = express.Router();

router
  .get("/logins-papeis", LoginPapelController.buscaTodosLoginsPapeis)
  .get("/logins-papeis/:id", LoginPapelController.buscaLoginPapelPorIdLogin)
  .post("/logins-papeis/:id/vincula", LoginPapelController.vinculaLoginAUmPapel)
  .post("/logins-papeis/:id/restaurar", LoginPapelController.restauraUmLoginPapel)
  .delete("/logins-papeis/:id", LoginPapelController.removePapelDeLogin);

module.exports = router;