const NaoEncontrado = require("../errors/NaoEncontrado");
const database = require("../models");
// const { buscaSistemaPorPessoa, buscaSistemaPorPessoaId } = require("../services/pessoaService.js");

class SistemaPessoaController {

  // static async buscaSistemaPorTodasPessoas (req, res, next) {
  //   try {
  //     const sistemaPorPessoa = await buscaSistemaPorPessoa();
  //     res.status(200).send(sistemaPorPessoa);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  // static async buscaSistemaPorPessoaId(req, res, next){
  //   const { id } = req.params;
  //   try {
  //     const sistemaPorPessoa = await buscaSistemaPorPessoaId(id);
  //     res.status(200).send(sistemaPorPessoa);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  static async buscaTodosSistemasPorPessoa(req, res, next) {
    console.log("entrando");
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
    const sistemaPorPessoa = await database.TN_T_SISTEMA_PESSOA.findAll({ where: {id_pessoa: Number(idPessoa)}});

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

  static async atualizaUmSistemaVinculadoAUmaPessoa(req, res, next) {
    const { id } = req.params;
    const idPessoa  = req.body.id_pessoa;
    const idSistema = req.body.id_sistema;

    const novoSistemaPorPessoa = {
      id_pessoa: idPessoa,
      id_sistema: idSistema,
      ds_usuario: req.body.ds_usuario,
      ds_senha: req.body.ds_senha,
      dt_updated: new Date(),
    };
    
    try {
      const sistemaPorPessoa = await database.TN_T_SISTEMA_PESSOA.findOne({ where: { id: Number(id)}});

      if(sistemaPorPessoa){
        await database.TN_T_SISTEMA_PESSOA.update(novoSistemaPorPessoa, {where: { id: Number(id)}});
        const sistemaPorPessoaAtualizada = await database.TN_T_SISTEMA_PESSOA.findOne({ where: { id: Number(id)}});
        res.status(200).send(sistemaPorPessoaAtualizada);
      } else {
        next(new NaoEncontrado("Não encontrado sistema vinculado a pessoa"));
      }
    
    } catch (err) {
      next(err);
    }
  }

  static async desvinculaUmSistemaAUmaPessoa(req, res, next) {
    const { id } = req.params;
    const sistemaPorPessoaEncontrado = await database.TN_T_SISTEMA_PESSOA.findOne({ where: { id: Number(id)}});

    try {
      if(sistemaPorPessoaEncontrado) {
        await database.TN_T_SISTEMA_PESSOA.destroy({ where: { id: Number(id)}});
        res.status(200).send({ message: "Sistema desvinculado da pessoa"});
      } else {
        next(new NaoEncontrado(`ID ${id} de sistema vinculado a pessoa não encontrado`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async restauraUmSistemaDesvinculadoPorPessoa(req, res, next) {
    const { id } = req.params;
    try{
      await database.TN_T_SISTEMA_PESSOA.restore({ where: { id: Number(id)}});
      const sistemaPorPessoaRestaurado = await database.TN_T_SISTEMA_PESSOA.findOne({ where: { id: Number(id)}});
      res.status(200).send({message: `ID ${id} restaurado.`}, sistemaPorPessoaRestaurado);
    } catch (err) {
      next(err);
    }
  }

}

module.exports = SistemaPessoaController;