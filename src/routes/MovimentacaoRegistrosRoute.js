const express = require("express");
const MovimentacaoRegistrosController = require("../controllers/movimentacaoRegistrosController");
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: "./src/uploads/admissoes" });

router
  .post("/envia-registros-sistema", upload.single("file"), MovimentacaoRegistrosController.processaPlanilha, MovimentacaoRegistrosController.criaPessoasESistema);

module.exports = router;