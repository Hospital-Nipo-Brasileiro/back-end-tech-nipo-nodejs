const NaoEncontrado = require("../errors/NaoEncontrado");
const database = require("../models");

class CargoController {

  static async buscaTodosCargos(req, res, next) {

    const cargosEncontrados = await database.TN_T_CARGO.findAll();
    try {
      if (cargosEncontrados.length !== 0) {
        res.status(200).send(cargosEncontrados);
      } else {
        next(new NaoEncontrado("Nenhum cargo cadastrado."));
      }
    } catch (err) {
      next(err);
    }
  }

  static async buscaCargoPorId(req, res, next) {
    const { id } = req.params;
    const cargoEncontrado = await database.TN_T_CARGO.findOne({ where: { id: Number(id) } });

    try {
      if (cargoEncontrado) {
        res.status(200).send(cargoEncontrado);
      } else {
        next(new NaoEncontrado(`ID ${id} de cargo não encontrado na busca`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async criaCargo(req, res, next) {
    const novoCargo = {
      ds_nome: req.body.ds_nome,
      dt_created: new Date(),
      dt_updated: new Date()
    };

    try {
      const novoCargoCriado = await database.TN_T_CARGO.create(novoCargo);
      res.status(201).send(novoCargoCriado);
    } catch (err) {
      next(err);
    }
  }

  static async atualizaUmCargo(req, res, next) {
    const { id } = req.params;
    const cargoEncontrado = await database.TN_T_CARGO.findOne({ where: { id: Number(id) } });
    const novoCargo = {
      ds_nome: req.body.ds_nome,
      dt_updated: new Date()
    };

    try {
      if (cargoEncontrado) {
        await database.TN_T_CARGO.update(novoCargo, { where: { id: Number(id) } });
        const cargoAtualizado = await database.TN_T_CARGO.findOne({ where: { id: Number(id) } });
        res.status(200).send(cargoAtualizado);
      } else {
        next(new NaoEncontrado(`ID ${id} de cargo não encontrado para atualizar`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async deletaUmCargo(req, res, next) {
    const { id } = req.params;
    const cargoEncontrado = await database.TN_T_CARGO.findOne({ where: { id: Number(id) } });
    try {
      if (cargoEncontrado) {
        await database.TN_T_CARGO.destroy({ where: { id: Number(id) } });
        res.status(200).send({ message: `Cargo de ID ${id} deletado.` });
      } else {
        next(new NaoEncontrado(`ID ${id} de cargo não encontrado para exclusão.`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async restauraCargo(req, res, next) {
    const { id } = req.params;
    try {
      await database.TN_T_CARGO.restore({ where: { id: Number(id) } });
      res.status(200).send({ message: `Cargo de ID ${id} restaurado.` });
    } catch (err) {
      next(err);
    }
  }

}

module.exports = CargoController;