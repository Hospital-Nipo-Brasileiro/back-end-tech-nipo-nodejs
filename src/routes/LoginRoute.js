const express = require("express");
const LoginController = require("../controllers/loginController.js");
const verifyToken = require("../middlewares/autenticador.js");

const router = express.Router();

router
  .get("/login", LoginController.buscaTodosLogins)
  .get("/login/:id", LoginController.buscaLoginPorId)
  .post("/login/cria", LoginController.criaLogin)
  .post("/login", LoginController.login)
  .get("/rotaProtegida", verifyToken, (req, res) => {
    const userId = req.userId;
    res.json({ message: "Rota protegida acessada com sucesso!", userId });
  });

module.exports = router;