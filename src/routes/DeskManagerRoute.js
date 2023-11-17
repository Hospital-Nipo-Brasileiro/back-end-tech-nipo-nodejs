const express = require("express");
const multer = require("multer");
const DeskManagerController = require("../controllers/deskManagerController.js");

const router = express.Router();
// Define o diretório onde os arquivos serão temporariamente salvos
const upload = multer({ dest: "./src/uploads/" });

router;
// .post("/desk-manager/autentica", DeskManagerController.autenticar)
// .post("/desk-manager/visualiza", upload.single("file"), DeskManagerController.visualizaUsuariosEMostra)
// .post("/desk-manager/cria-todos-usuarios", upload.single("file"), DeskManagerController.autenticar, DeskManagerController.visualizaUsuarios, DeskManagerController.criaUsuarios);

module.exports = router;