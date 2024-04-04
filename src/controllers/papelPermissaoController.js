const NaoEncontrado = require("../errors/NaoEncontrado");
const database = require("../models");

class PapelPermissaoController {
  static async buscaTodosPapeisPermissoes (req, res, next) {
    const papeisPermissoesEncontrados = await database.TN_T_PAPEL_PERMISSAO.findAll();
    try {
      if(papeisPermissoesEncontrados.length !== 0) {
        res.status(200).send(papeisPermissoesEncontrados);
      } else {
        next(new NaoEncontrado("Nenhum papel-permissão vinculados encontrado"));
      }
    } catch (err) {
      next(err);
    }
  }

  static async buscaPapelPermissaoPorId (req, res, next) {
    const {id} = req.params;
    const papelPermissaoEncontrado = await database.TN_T_PAPEL_PERMISSAO.findOne({ where: {id: Number(id)}});

    try {
      if(!papelPermissaoEncontrado){
        next(new NaoEncontrado(`ID ${id} de papel vinculado a permissão não encontrado`));
      }

      res.status(200).send(papelPermissaoEncontrado);
    } catch (err) {
      next(err);        
    }
  }

  static async vinculaUmaPermissaoAUmPapel (req, res, next) {
    const novoPapelPermissao = {
      id_papel: req.body.id_papel,
      id_permissao: req.body.id_permissao,
      dt_created: new Date(),
      dt_updated: new Date()
    };

    const papelEncontrado = await database.TN_T_PAPEL.findOne({ where: {id: Number(novoPapelPermissao.id_papel)}});
    const permissaoEncontrada = await database.TN_T_PERMISSAO.findOne({where: {id: Number(novoPapelPermissao.id_permissao)}});
    try {
      if(papelEncontrado && permissaoEncontrada) {
        const papelPermissaoCriado = await database.TN_T_PAPEL_PERMISSAO.create(novoPapelPermissao);
        res.status(201).send(papelPermissaoCriado);
      } else if (papelEncontrado && !permissaoEncontrada) {
        next(new NaoEncontrado(`ID ${novoPapelPermissao.id_permissao} de permissão não encontrada`));
      }  else if (!papelEncontrado && permissaoEncontrada) {
        next(new NaoEncontrado(`ID ${papelEncontrado} de papel não encontrado`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async desvinculaUmaPermissaoAUmPapel (req, res, next) {
    const {id} = req.params;
    const papelPermissaoEncontrado = await database.TN_T_PAPEL_PERMISSAO.findOne({ where: {id: Number(id)}});
    try{
      if(papelPermissaoEncontrado){
        await database.TN_T_PAPEL_PERMISSAO.destroy({where: {id: Number(id)}});
        res.status(200).send({message: `Papel Permissao de ID ${id} excluído.`});
      } else {
        next(new NaoEncontrado(`ID ${id} de papel permissao não encontrado para excluir.`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async restauraUmPapelPermissao(req, res, next) {
    const { id } = req.params;
    try{
      await database.TN_T_PAPEL_PERMISSAO.restore({where : {id : Number(id)}});
      res.status(200).send({message: `ID ${id} restaurado.`});
    } catch (err) {
      next(err);
    }
  }
  
}

module.exports = PapelPermissaoController;