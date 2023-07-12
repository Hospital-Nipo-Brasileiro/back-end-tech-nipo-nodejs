const NaoEncontrado = require("../errors/NaoEncontrado");
const database = require("../models");

class SistemaController {

  static async buscaTodosSistemas(req, res, next) {
    const sistemasEncontrados = await database.TN_T_SISTEMA.findAll();
    try{
      if(sistemasEncontrados.length !== 0) {
        res.status(200).send(sistemasEncontrados);
      } else {
        next(new NaoEncontrado("Nenhum sistema cadastrado."));
      }
    } catch (err) {
      next(err);
    }
  }

  static async buscaSistemaPorId(req, res, next) {
    const { id } = req.params;
    const sistemaEncontrado = await database.TN_T_SISTEMA.findOne({ where: {id: Number(id)}});

    try{
      if(sistemaEncontrado ){
        res.status(200).send(sistemaEncontrado);
      } else {
        next(new NaoEncontrado(`ID ${id} de sistema não encontrado na busca`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async criaSistema(req, res, next) {
    const novoSistema = {
      ds_nome: req.body.ds_nome,
      dt_created: new Date(),
      dt_updated: new Date()
    };

    try {
      const novoSistemaCriado = await database.TN_T_SISTEMA.create(novoSistema);
      res.status(201).send(novoSistemaCriado);
    } catch (err) {
      next(err);
    }
  }

  static async atualizaUmSistema(req, res, next) {
    const { id } = req.params;
    const sistemaEncontrado = await database.TN_T_SISTEMA.findOne({ where: {id: Number(id)}});
    const novoSistema = {
      ds_nome: req.body.ds_nome,
      dt_updated: new Date()
    };

    try{
      if(sistemaEncontrado){
        await database.TN_T_SISTEMA.update(novoSistema, { where: {id: Number(id)}});
        const sistemaAtualizado = await database.TN_T_SISTEMA.findOne({where: {id: Number(id)}});
        res.status(200).send(sistemaAtualizado);
      } else {
        next(new NaoEncontrado(`ID ${id} de sistema não encontrado para atualizar`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async deletaUmSistema(req, res, next) {
    const { id } = req.params;
    const sistemaEncontrado = await database.TN_T_SISTEMA.findOne({ where: {id: Number(id)}});
    try{
      if(sistemaEncontrado){
        await database.TN_T_SISTEMA.destroy({ where: { id: Number(id)}});
        res.status(200).send({message: `Sistema de ID ${id} deletado.`});
      } else {
        next(new NaoEncontrado(`ID ${id} de sistema não encontrado para exclusão.`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async restauraSistema(req, res, next) {
    const { id } = req.params;
    try{
      await database.TN_T_SISTEMA.restore({where : {id : Number(id)}});
      res.status(200).send({message: `Sistema de ID ${id} restaurado.`});
    } catch (err) {
      next(err);
    }
  }

}

module.exports = SistemaController;