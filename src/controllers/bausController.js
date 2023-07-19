const ErroBase = require("../errors/ErroBase");
const NaoEncontrado = require("../errors/NaoEncontrado");
const database = require("../models");

class BauController {

  static async buscaTodosBaus(req, res, next) {
    const bausEncontradas = await database.TN_T_BAU.findAll();
    try{
      if(bausEncontradas.length !== 0) {
        res.status(200).send(bausEncontradas);
      } else {
        next(new NaoEncontrado("Nenhum bau cadastrado."));
      }
    } catch (err) {
      next(err);
    }
  }

  static async buscaBauPorId(req, res, next) {
    const { id } = req.params;
    const bauEncontrado = await database.TN_T_BAU.findOne({ where: {id: Number(id)}});

    try{
      if(bauEncontrado){
        res.status(200).send(bauEncontrado);
      } else {
        next(new NaoEncontrado(`ID ${id} de bau não encontrado na busca`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async criaBau(req, res, next) {
    const zonaEncontrada = await database.TN_T_ZONA.findOne({ where: {id: Number(req.body.id_zona)}});

    const novoBau = {
      ds_nome: req.body.ds_nome,
      id_zona: req.body.id_zona,
      ds_tipo: req.body.ds_tipo,
      dt_created: new Date(),
      dt_updated: new Date()
    };

    try {

      if(zonaEncontrada) {
        const novoBauCriado = await database.TN_T_BAU.create(novoBau);
        res.status(201).send(novoBauCriado);
      } else if (!req.body.id_zona){
        next(new NaoEncontrado("É obrigatório o id de zona"));
      } else {
        next(new NaoEncontrado(`ID ${req.body.id_zona} de zona não encontrado para criação de nova bau. A bau deve estar vinculada a um zona`));
      }

      
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        res.status(400).send({ mensagem: err.message, status: 400 });
      }
      next(err);
    }
  }

  //PRECISO VALIDAR SE PASSAR O ID DE BAU O USUÁRIO QUER MOVIMENTAR O BAU PARA OUTRA ZONA
  static async atualizaUmBau(req, res, next) {
    const { id } = req.params;
    const bauEncontrado = await database.TN_T_BAU.findOne({ where: { id: Number(id) } });
    const zonaEncontrada = await database.TN_T_ZONA.findOne({ where: { id: Number(req.body.id_zona) } });

    try {
      if (bauEncontrado && zonaEncontrada) {
        const novaBau = {
          ds_nome: req.body.ds_nome,
          id_zona: req.body.id_zona,
          ds_tipo: req.body.ds_tipo,
          dt_updated: new Date(),
        };

        await database.TN_T_BAU.update(novaBau, { where: { id: Number(id) }, omitNull: true });
        const bauAtualizado = await database.TN_T_BAU.findOne({ where: { id: Number(id) } });
        res.status(200).send(bauAtualizado);
      } else if (bauEncontrado && !zonaEncontrada) {
        next(new NaoEncontrado(`Id de zona ${req.body.id_zona} não encontrado`));
      } else {
        next(new NaoEncontrado(`ID ${id} de bau não encontrado para atualizar`));
      }
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        res.status(400).send({ mensagem: err.message, status: 400 });
      }
      next(err);
    }
  }

  static async deletaUmBau(req, res, next) {
    const { id } = req.params;
    const bauEncontrado = await database.TN_T_BAU.findOne({ where: {id: Number(id)}});
    const itemGuardadoNoBau = await database.TN_T_ITEM_GUARDADO.findAll({ where: {id_bau: Number(id)}});

    try{
      if(bauEncontrado && itemGuardadoNoBau == null){
        await database.TN_T_BAU.destroy({ where: { id: Number(id)}});
        res.status(200).send({message: `Bau de ID ${id} deletado.`});
      } else if (bauEncontrado && itemGuardadoNoBau) {
        next(new ErroBase("Existe um item guardado neste baú, delete antes para excluir o baú", 400));
      } else {
        next(new NaoEncontrado(`ID ${id} de bau não encontrado para exclusão.`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async restauraBau(req, res, next) {
    const { id } = req.params;
    try{
      await database.TN_T_BAU.restore({where : {id : Number(id)}});
      res.status(200).send({message: `Bau de ID ${id} restaurado.`});
    } catch (err) {
      next(err);
    }
  }

}

module.exports = BauController;