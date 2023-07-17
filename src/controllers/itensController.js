const ErroBase = require("../errors/ErroBase.js");
const NaoEncontrado = require("../errors/NaoEncontrado.js");
const database = require("../models");


class ItemsController {

  static async buscaTodosItens (req, res, next) {
    const itensEncontradas = await database.TN_T_ITEM.findAll();
    try{
      if(itensEncontradas.length !== 0){
        res.status(200).send(itensEncontradas);
      } else {
        next(new NaoEncontrado("Nenhum item cadastrado."));
      }
    } catch (err) {
      next(err);
    }
  }

  static async buscaItemPorId (req, res, next) {
    const { id } = req.params;
    const itemEncontrada = await database.TN_T_ITEM.findOne({ where: {id: Number(id)}});
    try{
      if(itemEncontrada){
        res.status(200).send(itemEncontrada);
      } else {
        next(new NaoEncontrado(`ID ${id} de item não encontrado na busca.`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async criaUmItem(req, res, next) {
    const novoItem = {
      ds_nome: req.body.ds_nome,
      ds_modelo: req.body.ds_modelo,
      ds_item: req.body.ds_item,
      dt_created: new Date(),
      dt_updated: new Date(),
    };
  
    try {
      const novoItemCriada = await database.TN_T_ITEM.create(novoItem);
      res.status(201).send(novoItemCriada);
    } catch (err) {
      next(new ErroBase(err));
    }
  }

  static async atualizaUmItem(req, res, next) {
    const { id } = req.params;
    const itemEncontrada = await database.TN_T_ITEM.findOne({ where: {id: Number(id)}});
    const novasInfos = {
      ds_nome: req.body.ds_nome,
      ds_modelo: req.body.ds_modelo,
      ds_item: req.body.ds_item,
      dt_updated: new Date(),
    };
    try{
      if(itemEncontrada){
        await database.TN_T_ITEM.update(novasInfos, {where: {id: Number(id)}});
        const itemAtualizado = await database.TN_T_ITEM.findOne( { where:{ id: Number(id) }});
        res.status(200).send(itemAtualizado);
      } else {
        next(new NaoEncontrado(`ID ${id} de item não encontrado para atualizar informações.`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async deletaUmItem(req, res, next) {
    const {id} = req.params;
    const itemEncontrada = await database.TN_T_ITEM.findOne({ where: {id: Number(id)}});
    try{
      if(itemEncontrada){
        await database.TN_T_ITEM.destroy({where: {id: Number(id)}});
        res.status(200).send({message: `Usuário de ID ${id} excluído.`});
      } else {
        next(new NaoEncontrado(`ID ${id} de item não encontrado para excluir.`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async restauraUmItem(req, res, next) {
    const { id } = req.params;
    try{
      await database.TN_T_ITEM.restore({where : {id : Number(id)}});
      res.status(200).send({message: `ID ${id} restaurado.`});
    } catch (err) {
      next(err);
    }
  }

}

module.exports = ItemsController;