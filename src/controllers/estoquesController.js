const database = require("../models");
const NaoEncontrado = require("../errors/NaoEncontrado");

class EstoqueController{

  static async buscaTodosEstoques(req, res, next) {
    const estoquesEncontrados = await database.TN_T_ESTOQUE.findAll();
    try{
      if(estoquesEncontrados.length !== 0) {
        res.status(200).send(estoquesEncontrados);
      } else {
        next(new NaoEncontrado("Nenhum estoque cadastrado."));
      }
    } catch (err) {
      next(err);
    }
  }

  static async buscaEstoquePorId(req, res, next) {
    const { id } = req.params;
    const estoqueEncontrado = await database.TN_T_ESTOQUE.findOne({ where: {id: Number(id)}});

    try{
      if(estoqueEncontrado){
        res.status(200).send(estoqueEncontrado);
      } else {
        next(new NaoEncontrado(`ID ${id} de estoque não encontrado na busca`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async criaEstoque(req, res, next) {
    const novoEstoque = {
      ds_nome: req.params.ds_nome,
      ds_estoque: req.params.ds_estoque,   
      dt_created: new Date(),
      dt_updated: new Date()
    };

    try {
      const novoEstoqueCriado = await database.TN_T_ESTOQUE.create(novoEstoque);
      res.status(201).send(novoEstoqueCriado);
    } catch (err) {
      next(err);
    }
  }

  static async atualizaUmCargoSetor(req, res, next) {
    const { id } = req.params;
    const estoqueEncontrado = await database.TN_T_ESTOQUE.findOne({ where: {id: Number(id)}});
    const novoEstoque = {
      ds_nome: req.params.ds_nome,
      ds_estoque: req.params.ds_estoque,   
      dt_updated: new Date()
    };

    try{
      if(estoqueEncontrado){
        await database.TN_T_ESTOQUE.update(novoEstoque, { where: {id: Number(id)}});
        const estoqueAtualizado = await database.TN_T_ESTOQUE.findOne({where: {id: Number(id)}});
        res.status(200).send(estoqueAtualizado);
      } else {
        next(new NaoEncontrado(`ID ${id} de estoque não encontrado para atualizar`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async deletaUmEstoque(req, res, next) {
    const { id } = req.params;
    const estoqueEncontrado = await database.TN_T_ESTOQUE.findOne({ where: {id: Number(id)}});
    try{
      if(estoqueEncontrado){
        await database.TN_T_ESTOQUE.destroy({ where: { id: Number(id)}});
        res.status(200).send({message: `Estoque de ID ${id} deletado.`});
      } else {
        next(new NaoEncontrado(`ID ${id} de estoque não encontrado para exclusão.`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async restauraEstoque(req, res, next) {
    const { id } = req.params;    
    try{      
      await database.TN_T_ESTOQUE.restore({where : {id : Number(id)}});
      res.status(200).send({message: `Estoque de ID ${id} restaurado.`});
    } catch (err) {
      next(err);
    }
  }

}



module.exports = EstoqueController;