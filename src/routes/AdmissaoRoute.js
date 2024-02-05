const express = require("express");
const AdmissaoController = require("../controllers/admissaoController");
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: "./src/uploads-admissoes/" });

router
  .post("/admissoes/enviar", upload.single("file"), AdmissaoController.previsualizaPlanilha)
  .post("/admissoes/desk", upload.single("file"), AdmissaoController.formataPlanilha, AdmissaoController.autenticar, AdmissaoController.criarDeskManager)
  .post("/admissoes/concluir", upload.single("file"), AdmissaoController.formataPlanilha, AdmissaoController.criaUmaPessoaAutomatico, AdmissaoController.concluirAdmissao);
  
module.exports = router;