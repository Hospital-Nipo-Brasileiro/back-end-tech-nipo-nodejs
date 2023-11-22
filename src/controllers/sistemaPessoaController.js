const NaoEncontrado = require("../errors/NaoEncontrado");
const database = require("../models");

class SistemaPessoaController {
  static async buscaTodosSistemasPorPessoa(req, res, next) {
    try {
      const sistemasPorPessoas = await database.TN_T_SISTEMA_PESSOA.findAll();
      if(sistemasPorPessoas.length !== 0) {
        res.status(200).send(sistemasPorPessoas);
      } else {
        next(new NaoEncontrado("Nenhuma pessoa tem sistemas vinculado!"));
      }
    } catch (err) {
      next(err);
    }
  }

  static async buscaSistemaPorIdPessoa (req, res, next) {
    const idPessoa  = req.body.id_pessoa;
    const sistemaPorPessoa = await database.TN_T_SISTEMA_PESSOA.findOne({ where: {id_pessoa: Number(idPessoa)}});

    try {
      if(!sistemaPorPessoa){
        next(new NaoEncontrado("Não encontrado sistema vinculado a pessoa"));
      }

      res.status(200).send(sistemaPorPessoa);
    } catch (err) {
      next(err);        
    }
  }

  static async vinculaSistemaAUmaPessoa(req, res, next) {
    const idPessoa  = req.body.id_pessoa;
    const idSistema = req.body.id_sistema;
    const pessoaEncontrada = await database.TN_T_PESSOA.findOne({ where: {id: Number(idPessoa)}});
    const SistemaEncontrado = await database.TN_T_SISTEMA.findOne({ where: {id: Number(idSistema)}});

    const novoSistemaPorPessoa = {
      id_pessoa: idPessoa,
      id_sistema: idSistema,
      ds_usuario: req.body.ds_usuario,
      ds_senha: req.body.ds_senha,
      dt_created: new Date(),
      dt_updated: new Date(),
    };
    
    try {
      if(!pessoaEncontrada){
        next(new NaoEncontrado(`ID ${idPessoa} de pessoa não encontrado`));
      }
      if(!SistemaEncontrado) {
        next(new NaoEncontrado(`ID ${idSistema} de sistema não encontrado`));
      }

      const sistemaPorPessoaVinculado = await database.TN_T_SISTEMA_PESSOA.create(novoSistemaPorPessoa);
      res.status(200).send(sistemaPorPessoaVinculado);
      
    } catch (err) {
      next(err);
    }
  }

}

module.exports = SistemaPessoaController;