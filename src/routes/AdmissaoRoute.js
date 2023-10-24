const express = require("express");
const AdmissaoController = require("../controllers/admissaoController");
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: "./src/uploads-admissoes/" });

router
  .post("/enviar-admissao", upload.single("file"), AdmissaoController.previsualizaPlanilha);

module.exports = router;