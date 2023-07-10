const NaoEncontrado = require("../errors/NaoEncontrado.js");

function manipulador404(req, res, next) {
  const erro404 = new NaoEncontrado();
  next(erro404);
}

module.exports = manipulador404;