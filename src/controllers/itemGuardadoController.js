const ErroBase = require("../errors/ErroBase.js");
const NaoEncontrado = require("../errors/NaoEncontrado.js");
const database = require("../models");


class ItemGuardadoController {

  static async buscaTodosItensGuardados(req, res, next) {
    const itensGuardadosEncontrados = await database.TN_T_ITEM_GUARDADO.findAll();
    try {
      if (itensGuardadosEncontrados.length !== 0) {
        res.status(200).send(itensGuardadosEncontrados);
      } else {
        next(new NaoEncontrado("Nenhum item cadastrado."));
      }
    } catch (err) {
      next(err);
    }
  }

  static async buscaItemGuardadoPorId(req, res, next) {
    const { id } = req.params;
    const itemGuardadoEncontrado = await database.TN_T_ITEM_GUARDADO.findOne({ where: { id: Number(id) } });
    try {
      if (itemGuardadoEncontrado) {
        res.status(200).send(itemGuardadoEncontrado);
      } else {
        next(new NaoEncontrado(`ID ${id} de item guardado não encontrado na busca.`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async guardaUmItem(req, res, next) {


    const novoItem = {
      id_item: req.body.id_item,
      id_prateleira: req.body.id_prateleira,
      id_bau: req.body.id_bau,
      qt_item: req.body.qt_item,
      nr_tic: req.body.nr_tic,
      nr_patrimonio: req.body.nr_patrimonio,
      nr_serie: req.body.nr_serie,
      dt_created: new Date(),
      dt_updated: new Date(),
    };

    const itemEncontrado = await database.TN_T_ITEM.findOne({ where: { id: Number(novoItem.id_item) } });
    try {
      if (!itemEncontrado) {
        next(new NaoEncontrado("ID do item não encontrado"));
      } else if (req.body.id_prateleira && req.body.id_bau) {
        next(new ErroBase("Não é possível guardar um produto no baú e na prateleira ao mesmo tempo", 400));
      } else if (!req.body.id_prateleira && !req.body.id_bau) {
        next(new ErroBase("É necessário guardar o item em algum lugar", 400));
      } else {
        const novoItemGuardado = await database.TN_T_ITEM_GUARDADO.create(novoItem);
        res.status(201).send(novoItemGuardado);
      }
    } catch (err) {
      next(err);
    }
  }

  static async atualizaUmItemGuardado(req, res, next) {
    const { id } = req.params;
    const itemGuardadoEncontrado = await database.TN_T_ITEM_GUARDADO.findOne({ where: { id: Number(id) } });
    const novoItem = {
      id_item: req.body.id_item,
      id_prateleira: req.body.id_prateleira,
      id_bau: req.body.id_bau,
      qt_item: req.body.qt_item,
      nr_tic: req.body.nr_tic,
      nr_patrimonio: req.body.nr_patrimonio,
      nr_serie: req.body.nr_serie,
      dt_updated: new Date(),
    };

    try {
      if (itemGuardadoEncontrado) {

        if (req.body.id_prateleira) {
          novoItem.id_bau = null;
        } else if (req.body.id_bau) {
          novoItem.id_prateleira = null;
        } else if (req.body.id_prateleira !== null || req.body.id_bau !== null) {
          next(new ErroBase("Não é possível atualizar um item guardado no baú e na prateleira ao mesmo tempo", 400));
        }

        await database.TN_T_ITEM.update(novoItem, { where: { id: Number(id) } });
        const itemGuardadoAtualizado = await database.TN_T_ITEM_GUARDADO.findOne({ where: { id: Number(id) } });
        res.status(200).send(itemGuardadoAtualizado);
      } else {
        next(new NaoEncontrado(`ID ${id} de item guardado não encontrado para atualizar informações.`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async deletaUmItemGuardado(req, res, next) {
    const { id } = req.params;
    const itemGuardadoEncontrado = await database.TN_T_ITEM_GUARDADO.findOne({ where: { id: Number(id) } });
    try {
      if (itemGuardadoEncontrado) {
        await database.TN_T_ITEM_GUARDADO.destroy({ where: { id: Number(id) } });
        res.status(200).send({ message: `Item de ID ${id} excluído.` });
      } else {
        next(new NaoEncontrado(`ID ${id} de item guardado não encontrado para excluir.`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async restauraUmItemGuardado(req, res, next) {
    const { id } = req.params;
    try {
      await database.TN_T_ITEM_GUARDADO.restore({ where: { id: Number(id) } });
      res.status(200).send({ message: `ID ${id} restaurado.` });
    } catch (err) {
      next(err);
    }
  }

}

module.exports = ItemGuardadoController;