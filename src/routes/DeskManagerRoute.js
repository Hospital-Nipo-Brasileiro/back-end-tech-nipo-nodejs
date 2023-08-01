const express = require("express");
const DeskManagerController = require("../controllers/deskManagerController.js");

const router = express.Router();

router
  .post("/desk-manager/autentica", DeskManagerController.autenticar)
  .post("/desk-manager/visualiza", DeskManagerController.visualizaUsuarios);

module.exports = router;