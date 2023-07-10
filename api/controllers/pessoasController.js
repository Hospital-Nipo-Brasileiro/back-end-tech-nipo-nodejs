const database = require("../models");

class PessoasController {
  static async buscaTodasPessoas (req, res, next) {
    const pessoasEncontradas = await database.Pessoas.findAll();

    if(pessoasEncontradas !== null){
      res.status(200).send(pessoasEncontradas);
    } else {
      next();
    }
  }
}

module.exports = PessoasController;