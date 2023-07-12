const NaoEncontrado = require("../errors/NaoEncontrado");
const database = require("../models");

class SetorController {

  static async buscaTodosSetores(req, res, next) {
    const setoresEncontrados = await database.TN_T_SETOR.findAll();
    try{
      if(setoresEncontrados.length !== 0) {
        res.status(200).send(setoresEncontrados);
      } else {
        next(new NaoEncontrado("Nenhum setor cadastrado."));
      }
    } catch (err) {
      next(err);
    }
  }

  static async buscaSetorPorId(req, res, next) {
    const { id } = req.params;
    const setorEncontrado = await database.TN_T_SETOR.findOne({ where: {id: Number(id)}});

    try{
      if(setorEncontrado ){
        res.status(200).send(setorEncontrado);
      } else {
        next(new NaoEncontrado(`ID ${id} de setor não encontrado na busca`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async criaSetor(req, res, next) {

    const novoSetor = {
      ds_nome: req.body.ds_nome,
      sg_local: req.body.sg_local,
      ds_local: req.body.ds_local,
      dt_created: new Date(),
      dt_updated: new Date()
    };

    try {
      const novoSetorCriado = await database.TN_T_SETOR.create(novoSetor);
      res.status(201).send(novoSetorCriado);
    } catch (err) {
      next(err);
    }

  }

  static async atualizaUmSetor(req, res, next) {
    const { id } = req.params;
    const setorEncontrado = await database.TN_T_SETOR.findOne({ where: {id: Number(id)}});
    const novoSetor = {
      ds_nome: req.body.ds_nome,
      sg_local: req.body.sg_local,
      ds_local: req.body.ds_local,
      dt_updated: new Date()
    };

    try{
      if(setorEncontrado){
        await database.TN_T_SETOR.update(novoSetor, { where: {id: Number(id)}});
        const setorAtualizado = await database.TN_T_SETOR.findOne({where: {id: Number(id)}});
        res.status(200).send(setorAtualizado);
      } else {
        next(new NaoEncontrado(`ID ${id} de setor não encontrado para atualizar`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async deletaUmSetor(req, res, next) {
    const { id } = req.params;
    const setorEncontrado = await database.TN_T_SETOR.findOne({ where: {id: Number(id)}});
    try{
      if(setorEncontrado){
        await database.TN_T_SETOR.destroy({ where: { id: Number(id)}});
        res.status(200).send({message: `Setor de ID ${id} deletado.`});
      } else {
        next(new NaoEncontrado(`ID ${id} de setor não encontrado para exclusão.`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async restauraSetor(req, res, next) {
    const { id } = req.params;
    try{
      await database.TN_T_SETOR.restore({where : {id : Number(id)}});
      res.status(200).send({message: `Setor de ID ${id} restaurado.`});
    } catch (err) {
      next(err);
    }
  }

}

module.exports = SetorController;