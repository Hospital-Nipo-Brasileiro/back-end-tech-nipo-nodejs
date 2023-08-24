const ErroBase = require("./ErroBase.js");

class AcessoNaoAutorizado extends ErroBase {
  constructor(message = "Você não tem permissões de acesso") {
    super(message, 403);
  }
}

module.exports = AcessoNaoAutorizado;