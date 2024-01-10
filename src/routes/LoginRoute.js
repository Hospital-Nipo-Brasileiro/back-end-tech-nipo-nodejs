const express = require("express");
const LoginController = require("../controllers/loginController.js");
const verifyToken = require("../middlewares/autenticador.js");

const router = express.Router();

router
  .get("/login", LoginController.buscaTodosLogins)
  .get("/login/:id", LoginController.buscaLoginPorId)
  .get("/rotaProtegida", verifyToken, (req, res) => {
    const userId = req.userId;
    res.json({ message: "Rota protegida acessada com sucesso!", userId });
  })
  .get("/login/:id/infos", LoginController.buscaPessoaPorLogin)
  .post("/login/cria", LoginController.criaLogin)
  .post("/login", LoginController.login)
  .put("/login/:id", LoginController.alteraSenha)
  .put("/login/:id/reset", LoginController.resetaSenha)
  .put("/login/:id/ativa", LoginController.ativaUsuario)
  .delete("/login/:id", LoginController.desativaLogin);

module.exports = router;