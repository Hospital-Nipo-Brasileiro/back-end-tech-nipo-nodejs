const ErroBase = require("../errors/ErroBase.js");
const NaoEncontrado = require("../errors/NaoEncontrado.js");
const database = require("../models/index.js");


class PermissaoController {

  static async buscaTodasPermissoes (req, res, next) {
    const permissoesEncontradas = await database.TN_T_PERMISSAO.findAll();
    try{
      if(permissoesEncontradas.length !== 0){
        res.status(200).send(permissoesEncontradas);
      } else {
        next(new NaoEncontrado("Nenhuma permissao cadastrada."));
      }
    } catch (err) {
      next(err);
    }
  }

  static async buscaPermissaoPorId (req, res, next) {
    const { id } = req.params;
    const permissaoEncontrada = await database.TN_T_PERMISSAO.findOne({ where: {id: Number(id)}});
    try{
      if(permissaoEncontrada){
        res.status(200).send(permissaoEncontrada);
      } else {
        next(new NaoEncontrado(`ID ${id} de permissao não encontrada na busca.`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async criaUmaPermissao(req, res, next) {
    const novaPermissao = {
      ds_nome: req.body.ds_nome,
      ds_descricao: req.body.ds_descricao,
      dt_created: new Date(),
      dt_updated: new Date(),
    };
  
    try {
      const novaPermissaoCriada = await database.TN_T_PERMISSAO.create(novaPermissao);
      res.status(201).send(novaPermissaoCriada);
    } catch (err) {
      next(new ErroBase(err));
    }
  }

  static async atualizaUmaPermissao(req, res, next) {
    const { id } = req.params;
    const permissaoEncontrada = await database.TN_T_PERMISSAO.findOne({ where: {id: Number(id)}});
    const novasInfos = {
      ds_nome: req.body.ds_nome,
      ds_descricao: req.body.ds_descricao,
      dt_updated: new Date(),
    };
    try{
      if(permissaoEncontrada){
        await database.TN_T_PERMISSAO.update(novasInfos, {where: {id: Number(id)}});
        const permissaoAtualizada = await database.TN_T_PERMISSAO.findOne( { where:{ id: Number(id) }});
        res.status(200).send(permissaoAtualizada);
      } else {
        next(new NaoEncontrado(`ID ${id} de permissao não encontrada para atualizar informações.`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async deletaUmaPermissao(req, res, next) {
    const {id} = req.params;
    const permissaoEncontrada = await database.TN_T_PERMISSAO.findOne({ where: {id: Number(id)}});
    try{
      if(permissaoEncontrada){
        await database.TN_T_PERMISSAO.destroy({where: {id: Number(id)}});
        res.status(200).send({message: `Usuário de ID ${id} excluído.`});
      } else {
        next(new NaoEncontrado(`ID ${id} de permissao não encontrada para excluir.`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async restauraUmaPermissao(req, res, next) {
    const { id } = req.params;
    try{
      await database.TN_T_PERMISSAO.restore({where : {id : Number(id)}});
      res.status(200).send({message: `ID ${id} restaurado.`});
    } catch (err) {
      next(err);
    }
  }

}

module.exports = PermissaoController;