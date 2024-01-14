const ErroBase = require("../errors/ErroBase.js");
const NaoEncontrado = require("../errors/NaoEncontrado.js");
const database = require("../models/index.js");


class PapelController {

  static async buscaTodosPapel (req, res, next) {
    const papeisEncontrados = await database.TN_T_PAPEL.findAll();
    try{
      if(papeisEncontrados.length !== 0){
        res.status(200).send(papeisEncontrados);
      } else {
        next(new NaoEncontrado("Nenhum papel cadastrado."));
      }
    } catch (err) {
      next(err);
    }
  }

  static async buscaPapelPorId (req, res, next) {
    const { id } = req.params;
    const papelEncontrado = await database.TN_T_PAPEL.findOne({ where: {id: Number(id)}});
    try{
      if(papelEncontrado){
        res.status(200).send(papelEncontrado);
      } else {
        next(new NaoEncontrado(`ID ${id} de papel não encontrado na busca.`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async buscaPermissaoPorPapel(req, res, next) {
    const { id } = req.params;
    const papelEncontrado = await database.TN_T_PAPEL.findOne({ where: { id: Number(id)}});
    try {
      if(!papelEncontrado) {
        next(new NaoEncontrado(`O papel de id ${id} não foi encontrado`));
      }

      const permissoesEncontradasPorPapel = await database.TN_T_PAPEL_PERMISSAO.findAll({ where: {id_papel: Number(id)}});
      res.status(200).send(permissoesEncontradasPorPapel);
    } catch (err) {
      next(err);
    }
  }

  static async criaUmPapel(req, res, next) {
    const novoPapel = {
      ds_nome: req.body.ds_nome,
      ds_descricao: req.body.ds_descricao,
      dt_created: new Date(),
      dt_updated: new Date(),
    };
  
    try {
      const novoPapelCriado = await database.TN_T_PAPEL.create(novoPapel);
      res.status(201).send(novoPapelCriado);
    } catch (err) {
      next(new ErroBase(err));
    }
  }

  static async atualizaUmPapel(req, res, next) {
    const { id } = req.params;
    const papelEncontrado = await database.TN_T_PAPEL.findOne({ where: {id: Number(id)}});
    const novasInfos = {
      ds_nome: req.body.ds_nome,
      ds_descricao: req.body.ds_descricao,
      dt_updated: new Date(),
    };
    try{
      if(papelEncontrado){
        await database.TN_T_PAPEL.update(novasInfos, {where: {id: Number(id)}});
        const papelAtualizado = await database.TN_T_PAPEL.findOne( { where:{ id: Number(id) }});
        res.status(200).send(papelAtualizado);
      } else {
        next(new NaoEncontrado(`ID ${id} de papel não encontrado para atualizar informações.`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async deletaUmPapel(req, res, next) {
    const {id} = req.params;
    const papelEncontrado = await database.TN_T_PAPEL.findOne({ where: {id: Number(id)}});
    try{
      if(papelEncontrado){
        await database.TN_T_PAPEL.destroy({where: {id: Number(id)}});
        res.status(200).send({message: `Usuário de ID ${id} excluído.`});
      } else {
        next(new NaoEncontrado(`ID ${id} de papel não encontrado para excluir.`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async restauraUmPapel(req, res, next) {
    const { id } = req.params;
    try{
      await database.TN_T_PAPEL.restore({where : {id : Number(id)}});
      res.status(200).send({message: `ID ${id} restaurado.`});
    } catch (err) {
      next(err);
    }
  }

}

module.exports = PapelController;