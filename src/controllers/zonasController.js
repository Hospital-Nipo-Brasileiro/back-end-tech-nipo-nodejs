const ErroBase = require("../errors/ErroBase");
const NaoEncontrado = require("../errors/NaoEncontrado");
const database = require("../models");

class ZonaController {

  static async buscaTodasZonas(req, res, next) {
    const zonasEncontradas = await database.TN_T_ZONA.findAll();
    try{
      if(zonasEncontradas.length !== 0) {
        res.status(200).send(zonasEncontradas);
      } else {
        next(new NaoEncontrado("Nenhum zona cadastrado."));
      }
    } catch (err) {
      next(err);
    }
  }

  static async buscaZonaPorId(req, res, next) {
    const { id } = req.params;
    const zonaEncontrada = await database.TN_T_ZONA.findOne({ where: {id: Number(id)}});

    try{
      if(zonaEncontrada){
        res.status(200).send(zonaEncontrada);
      } else {
        next(new NaoEncontrado(`ID ${id} de zona não encontrado na busca`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async criaZona(req, res, next) {
    const estoqueEncontrado = await database.TN_T_ESTOQUE.findOne({ where: {id: Number(req.body.id_estoque)}});

    try {

      if(estoqueEncontrado) {
        const novaZona = {
          ds_nome: req.body.ds_nome,
          id_estoque: req.body.id_estoque,
          dt_created: new Date(),
          dt_updated: new Date()
        };

        const novoZonaCriada = await database.TN_T_ZONA.create(novaZona);
        res.status(201).send(novoZonaCriada);
      } else if (!req.body.id_estoque){
        next(new NaoEncontrado("É obrigatório o id de estoque"));
      } else {
        next(new NaoEncontrado(`ID ${req.body.id_estoque} de estoque não encontrado para criação de nova zona. A zona deve estar vinculada a um estoque`));
      }

      
    } catch (err) {
      next(err);
    }
  }

  //Para atualizar uma zona deve ser passado obrigatóriamente um id_estoque
  static async atualizaUmZona(req, res, next) {
    const { id } = req.params;
    const zonaEncontrada = await database.TN_T_ZONA.findOne({ where: {id: Number(id)}});
    const estoqueEncontrado = await database.TN_T_ESTOQUE.findOne({ where: {id: Number(req.body.id_estoque)}});

    const novaZona = {
      ds_nome: req.body.ds_nome,
      id_estoque: req.body.id_estoque,
      dt_updated: new Date(),
    };

    try{
      if(zonaEncontrada && estoqueEncontrado){
        await database.TN_T_ZONA.update(novaZona, { where: {id: Number(id)}});
        const zonaAtualizado = await database.TN_T_ZONA.findOne({where: {id: Number(id)}});
        res.status(200).send(zonaAtualizado);
        
      } else if (zonaEncontrada && !estoqueEncontrado){
        next(new NaoEncontrado(`Id de estoque ${req.body.id_estoque} não encontrado`));
      } else {
        next(new NaoEncontrado(`ID ${id} de zona não encontrado para atualizar`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async deletaUmZona(req, res, next) {
    const { id } = req.params;
    const zonaEncontrada = await database.TN_T_ZONA.findOne({ where: {id: Number(id)}});
    const bauVinculadoAZona = await database.TN_T_BAU.findAll({ where: {id_zona: Number(id)}});
    const armarioVinculadoAZona = await database.TN_T_ARMARIO.findAll({ where: {id_zona: Number(id)}});

    try{
      if(zonaEncontrada && bauVinculadoAZona == null && armarioVinculadoAZona == null){
        await database.TN_T_ZONA.destroy({ where: { id: Number(id)}});
        res.status(200).send({message: `Zona de ID ${id} deletado.`});
      } else if(zonaEncontrada && bauVinculadoAZona && armarioVinculadoAZona) {
        next(new ErroBase("Existe baú e armário vinculado a zona mencionada"));
      } else if(zonaEncontrada && bauVinculadoAZona && armarioVinculadoAZona !== null){
        next(new ErroBase("Existe baú vinculado a zona mencionada"));
      } else if(zonaEncontrada && bauVinculadoAZona !== null && armarioVinculadoAZona) {
        next(new ErroBase("Existe armário vinculado a zona mencionada"));
      } else {
        next(new NaoEncontrado(`ID ${id} de zona não encontrado para exclusão.`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async restauraZona(req, res, next) {
    const { id } = req.params;
    try{
      await database.TN_T_ZONA.restore({where : {id : Number(id)}});
      res.status(200).send({message: `Zona de ID ${id} restaurado.`});
    } catch (err) {
      next(err);
    }
  }

}

module.exports = ZonaController;