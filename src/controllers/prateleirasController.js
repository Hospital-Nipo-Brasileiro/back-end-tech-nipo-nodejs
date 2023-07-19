const NaoEncontrado = require("../errors/NaoEncontrado");
const database = require("../models");

class PrateleiraController {

  static async buscaTodasPrateleiras(req, res, next) {
    const prateleirasEncontradas = await database.TN_T_PRATELEIRA.findAll();
    try{
      if(prateleirasEncontradas.length !== 0) {
        res.status(200).send(prateleirasEncontradas);
      } else {
        next(new NaoEncontrado("Nenhum prateleira cadastrado."));
      }
    } catch (err) {
      next(err);
    }
  }

  static async buscaPrateleiraPorId(req, res, next) {
    const { id } = req.params;
    const prateleiraEncontrada = await database.TN_T_PRATELEIRA.findOne({ where: {id: Number(id)}});

    try{
      if(prateleiraEncontrada){
        res.status(200).send(prateleiraEncontrada);
      } else {
        next(new NaoEncontrado(`ID ${id} de prateleira não encontrado na busca`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async criaPrateleira(req, res, next) {
    const armarioEncontrado = await database.TN_T_ARMARIO.findOne({ where: {id: Number(req.body.id_armario)}});

    try {

      if(armarioEncontrado) {
        const novaPrateleira = {
          ds_nome: req.body.ds_nome,
          id_armario: req.body.id_armario,
          dt_created: new Date(),
          dt_updated: new Date()
        };

        const novoPrateleiraCriada = await database.TN_T_PRATELEIRA.create(novaPrateleira);
        res.status(201).send(novoPrateleiraCriada);
      } else if (!req.body.id_armario){
        next(new NaoEncontrado("É obrigatório o id de armario"));
      } else {
        next(new NaoEncontrado(`ID ${req.body.id_armario} de armario não encontrado para criação de nova prateleira. A prateleira deve estar vinculada a um armario`));
      }

      
    } catch (err) {
      next(err);
    }
  }

  static async atualizaUmPrateleira(req, res, next) {
    const { id } = req.params;
    const prateleiraEncontrada = await database.TN_T_PRATELEIRA.findOne({ where: {id: Number(id)}});
    const armarioEncontrado = await database.TN_T_ARMARIO.findOne({ where: {id: Number(req.body.id_armario)}});

    try{
      if(prateleiraEncontrada && armarioEncontrado){

        const novaPrateleira = {
          ds_nome: req.body.ds_nome,
          id_armario: req.body.id_armario,
          dt_updated: new Date()
        };

        await database.TN_T_PRATELEIRA.update(novaPrateleira, { where: {id: Number(id)}});
        const prateleiraAtualizado = await database.TN_T_PRATELEIRA.findOne({where: {id: Number(id)}});
        res.status(200).send(prateleiraAtualizado);
        
      } else if (prateleiraEncontrada && !armarioEncontrado){
        next(new NaoEncontrado(`Id de armario ${req.body.id_armario} não encontrado`));
      } else {
        next(new NaoEncontrado(`ID ${id} de prateleira não encontrado para atualizar`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async deletaUmPrateleira(req, res, next) {
    const { id } = req.params;
    const prateleiraEncontrada = await database.TN_T_PRATELEIRA.findOne({ where: {id: Number(id)}});
    try{
      if(prateleiraEncontrada){
        await database.TN_T_PRATELEIRA.destroy({ where: { id: Number(id)}});
        res.status(200).send({message: `Prateleira de ID ${id} deletado.`});
      } else {
        next(new NaoEncontrado(`ID ${id} de prateleira não encontrado para exclusão.`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async restauraPrateleira(req, res, next) {
    const { id } = req.params;
    try{
      await database.TN_T_PRATELEIRA.restore({where : {id : Number(id)}});
      res.status(200).send({message: `Prateleira de ID ${id} restaurado.`});
    } catch (err) {
      next(err);
    }
  }

}

module.exports = PrateleiraController;