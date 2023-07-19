const ErroBase = require("../errors/ErroBase");
const NaoEncontrado = require("../errors/NaoEncontrado");
const database = require("../models");

class ArmarioController {

  static async buscaTodosArmarios(req, res, next) {
    const armariosEncontradas = await database.TN_T_ARMARIO.findAll();
    try{
      if(armariosEncontradas.length !== 0) {
        res.status(200).send(armariosEncontradas);
      } else {
        next(new NaoEncontrado("Nenhum armario cadastrado."));
      }
    } catch (err) {
      next(err);
    }
  }

  static async buscaArmarioPorId(req, res, next) {
    const { id } = req.params;
    const armarioEncontrado = await database.TN_T_ARMARIO.findOne({ where: {id: Number(id)}});

    try{
      if(armarioEncontrado){
        res.status(200).send(armarioEncontrado);
      } else {
        next(new NaoEncontrado(`ID ${id} de armario não encontrado na busca`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async criaArmario(req, res, next) {
    const zonaEncontrada = await database.TN_T_ZONA.findOne({ where: {id: Number(req.body.id_zona)}});

    try {

      if(zonaEncontrada) {
        const novaArmario = {
          ds_nome: req.body.ds_nome,
          id_zona: req.body.id_zona,
          dt_created: new Date(),
          dt_updated: new Date()
        };

        const novoArmarioCriada = await database.TN_T_ARMARIO.create(novaArmario);
        res.status(201).send(novoArmarioCriada);
      } else if (!req.body.id_zona){
        next(new NaoEncontrado("É obrigatório o id de zona"));
      } else {
        next(new NaoEncontrado(`ID ${req.body.id_zona} de zona não encontrado para criação de nova armario. A armario deve estar vinculada a um zona`));
      }

      
    } catch (err) {
      next(err);
    }
  }

  static async atualizaUmArmario(req, res, next) {
    const { id } = req.params;
    const armarioEncontrado = await database.TN_T_ARMARIO.findOne({ where: {id: Number(id)}});
    const zonaEncontrada = await database.TN_T_ZONA.findOne({ where: {id: Number(req.body.id_zona)}});

    try{
      if(armarioEncontrado && zonaEncontrada){

        const novaArmario = {
          ds_nome: req.body.ds_nome,
          id_zona: req.body.id_zona,
          dt_updated: new Date()
        };

        await database.TN_T_ARMARIO.update(novaArmario, { where: {id: Number(id)}});
        const armarioAtualizado = await database.TN_T_ARMARIO.findOne({where: {id: Number(id)}});
        res.status(200).send(armarioAtualizado);
        
      } else if (armarioEncontrado && !zonaEncontrada){
        next(new NaoEncontrado(`Id de zona ${req.body.id_zona} não encontrado`));
      } else {
        next(new NaoEncontrado(`ID ${id} de armario não encontrado para atualizar`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async deletaUmArmario(req, res, next) {
    const { id } = req.params;
    const armarioEncontrado = await database.TN_T_ARMARIO.findOne({ where: {id: Number(id)}});
    const prateleiraDoArmario = await database.TN_T_PRATELEIRA.findAll({ where: {id_armario: Number(id)}});

    try{
      if(armarioEncontrado && prateleiraDoArmario == null){
        await database.TN_T_ARMARIO.destroy({ where: { id: Number(id)}});
        res.status(200).send({message: `Armario de ID ${id} deletado.`});
      } else if (armarioEncontrado && prateleiraDoArmario){
        next(new ErroBase("Prateleira existente no armário.", 400));
      } else {
        next(new NaoEncontrado(`ID ${id} de armario não encontrado para exclusão.`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async restauraArmario(req, res, next) {
    const { id } = req.params;
    try{
      await database.TN_T_ARMARIO.restore({where : {id : Number(id)}});
      res.status(200).send({message: `Armario de ID ${id} restaurado.`});
    } catch (err) {
      next(err);
    }
  }

}

module.exports = ArmarioController;