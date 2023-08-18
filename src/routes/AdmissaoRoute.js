const express = require("express");
const AdmissaoCsvController = require("../controllers/admissaoCsvController");

const router = express.Router();

router
  .post("/enviar-admissao", AdmissaoCsvController.previsualizaPlanilhaCSV);

module.exports = router;