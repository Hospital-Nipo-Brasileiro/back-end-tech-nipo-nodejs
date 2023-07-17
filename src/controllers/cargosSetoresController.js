const NaoEncontrado = require("../errors/NaoEncontrado");
const database = require("../models");

class CargoSetorController {

  static async buscaTodosCargosSetores(req, res, next) {
    const cargosSetoresEncontrados = await database.TN_T_CARGO_SETOR.findAll();
    try{
      if(cargosSetoresEncontrados.length !== 0) {
        res.status(200).send(cargosSetoresEncontrados);
      } else {
        next(new NaoEncontrado("Nenhum cargo-setor cadastrado."));
      }
    } catch (err) {
      next(err);
    }
  }

  static async buscaCargoSetorPorId(req, res, next) {
    const { id } = req.params;
    const cargoSetorEncontrado = await database.TN_T_CARGO_SETOR.findOne({ where: {id: Number(id)}});

    try{
      if(cargoSetorEncontrado ){
        res.status(200).send(cargoSetorEncontrado);
      } else {
        next(new NaoEncontrado(`ID ${id} de cargo não encontrado na busca`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async buscaCargoSetorPorCargo(req, res, next) {
    const { cargoId } = req.params;
    const cargoSetorEncontrado = await database.TN_T_CARGO_SETOR.findOne({ where: {id_cargo: Number(cargoId)}});

    try{
      if(cargoSetorEncontrado ){
        res.status(200).send(cargoSetorEncontrado);
      } else {
        next(new NaoEncontrado(`ID ${cargoId} de cargo não encontrado na busca`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async buscaCargoSetorPorSetor(req, res, next) {
    const { setorId } = req.params;
    const cargoSetorEncontrado = await database.TN_T_CARGO_SETOR.findOne({ where: {id_setor: Number(setorId)}});

    try{
      if(cargoSetorEncontrado ){
        res.status(200).send(cargoSetorEncontrado);
      } else {
        next(new NaoEncontrado(`ID ${setorId} de cargo não encontrado na busca`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async criaCargoSetor(req, res, next) {
    const novoCargoSetor = {
      id_cargo: req.body.id_cargo,
      id_setor: req.body.id_setor,      
      dt_created: new Date(),
      dt_updated: new Date()
    };

    try {
      const novoCargoSetorCriado = await database.TN_T_CARGO_SETOR.create(novoCargoSetor);
      res.status(201).send(novoCargoSetorCriado);
    } catch (err) {
      next(err);
    }
  }

  static async atualizaUmCargoSetor(req, res, next) {
    const { id } = req.params;
    const cargoSetorEncontrado = await database.TN_T_CARGO_SETOR.findOne({ where: {id: Number(id)}});
    const novoCargoSetor = {
      id_cargo: req.body.id_cargo,
      id_setor: req.body.id_setor,
      dt_updated: new Date()
    };

    try{
      if(cargoSetorEncontrado){
        await database.TN_T_CARGO_SETOR.update(novoCargoSetor, { where: {id: Number(id)}});
        const cargoSetorAtualizado = await database.TN_T_CARGO_SETOR.findOne({where: {id: Number(id)}});
        res.status(200).send(cargoSetorAtualizado);
      } else {
        next(new NaoEncontrado(`ID ${id} de cargo não encontrado para atualizar`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async deletaUmCargoSetor(req, res, next) {
    const { id } = req.params;
    const cargoSetorEncontrado = await database.TN_T_CARGO_SETOR.findOne({ where: {id: Number(id)}});
    try{
      if(cargoSetorEncontrado){
        await database.TN_T_CARGO_SETOR.destroy({ where: { id: Number(id)}});
        res.status(200).send({message: `Cargo de ID ${id} deletado.`});
      } else {
        next(new NaoEncontrado(`ID ${id} de cargo não encontrado para exclusão.`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async restauraCargoSetor(req, res, next) {
    const { id } = req.params;    
    try{      
      await database.TN_T_CARGO_SETOR.restore({where : {id : Number(id)}});
      res.status(200).send({message: `Cargo de ID ${id} restaurado.`});
    } catch (err) {
      next(err);
    }
  }

}

module.exports = CargoSetorController;