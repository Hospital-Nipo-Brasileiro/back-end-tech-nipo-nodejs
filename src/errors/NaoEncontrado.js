const ErroBase =  require("./ErroBase.js");

class NaoEncontrado extends ErroBase {
  constructor (message = "Página não encontrada"){
    super(message, 404);
  }
}

module.exports = NaoEncontrado;