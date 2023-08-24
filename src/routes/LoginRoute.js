const express = require("express");
const LoginController = require("../controllers/loginController");

const router = express.Router();

router
  .post("/login", LoginController.createLogin)
  .post("/logon", LoginController.logon);

module.exports = router;