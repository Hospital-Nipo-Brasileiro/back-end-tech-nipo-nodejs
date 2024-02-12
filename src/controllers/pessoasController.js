const ErroBase = require("../errors/ErroBase.js");
const NaoEncontrado = require("../errors/NaoEncontrado.js");
const database = require("../models");

class PessoasController {

  static async buscaTodasPessoas(req, res, next) {
    const pagina = req.query.pagina || 1; // Verifica se foi especificada uma página, caso contrário, assume a primeira página
    const limitePorPagina = 20;
    const offset = (pagina - 1) * limitePorPagina;
  
    try {
      const pessoasEncontradas = await database.TN_T_PESSOA.findAll({
        limit: limitePorPagina,
        offset: offset
      });
  
      if (pessoasEncontradas.length !== 0) {
        res.status(200).send(pessoasEncontradas);
      } else {
        next(new NaoEncontrado("Nenhuma pessoa cadastrada."));
      }
    } catch (err) {
      next(err);
    }
  }

  static async buscaPessoaPorId(req, res, next) {
    const { id } = req.params;
    const pessoaEncontrada = await database.TN_T_PESSOA.findOne({ where: { id: Number(id) } });
    try {
      if (pessoaEncontrada) {
        res.status(200).send(pessoaEncontrada);
      } else {
        next(new NaoEncontrado(`ID ${id} de pessoa não encontrada na busca.`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async criaUmaPessoa(req, res, next) {
    const cpf = req.body.nr_cpf;

    const novaPessoa = {
      ds_nome: req.body.ds_nome,
      nr_cpf: cpf,
      dt_admissao: req.body.dt_admissao,
      dt_nascimento: req.body.dt_nascimento,
      tp_contrato: req.body.tp_contrato,
      ds_categoria_cargo: req.body.ds_categoria_cargo,
      id_cargo_setor: req.body.id_cargo_setor,
      id_login: req.userId,
      id_login_last_update: req.userId,
      dt_created: new Date(),
      dt_updated: new Date(),
    };

    try {
      const pessoaEncontrada = await database.TN_T_PESSOA.findOne({ where: {nr_cpf: Number(cpf)}});

      if (pessoaEncontrada) {
        next(new ErroBase(`Já existe uma pessoa com este cpf ${cpf}`, 409));
      }
      
      const novaPessoaCriada = await database.TN_T_PESSOA.create(novaPessoa);
      res.status(201).send(novaPessoaCriada);
    } catch (err) {
      next(new ErroBase(err));
    }
  }

  static async atualizaUmaPessoa(req, res, next) {
    const { id } = req.params;
    const pessoaEncontrada = await database.TN_T_PESSOA.findOne({ where: { id: Number(id) } });
    const novasInfos = {
      ds_nome: req.body.ds_nome,
      nr_cpf: req.body.nr_cpf,
      dt_admissao: req.body.dt_admissao,
      dt_nascimento: req.body.dt_nascimento,
      tp_contrato: req.body.tp_contrato,
      ds_categoria_cargo: req.body.tp_categoria_cargo,
      id_login_last_update: req.userId,
      dt_updated: new Date(),
    };
    try {
      if (pessoaEncontrada) {
        await database.TN_T_PESSOA.update(novasInfos, { where: { id: Number(id) } });
        const pessoaAtualizada = await database.TN_T_PESSOA.findOne({ where: { id: Number(id) } });
        res.status(200).send(pessoaAtualizada);
      } else {
        next(new NaoEncontrado(`ID ${id} de pessoa não encontrada para atualizar informações.`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async deletaUmaPessoa(req, res, next) {
    const { id } = req.params;
    const pessoaEncontrada = await database.TN_T_PESSOA.findOne({ where: { id: Number(id) } });
    try {
      if (pessoaEncontrada) {
        await database.TN_T_PESSOA.destroy({ where: { id: Number(id) } });
        res.status(200).send({ message: `Usuário de ID ${id} excluído.` });
      } else {
        next(new NaoEncontrado(`ID ${id} de pessoa não encontrada para excluir.`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async restauraUmaPessoa(req, res, next) {
    const { id } = req.params;
    try {
      await database.TN_T_PESSOA.restore({ where: { id: Number(id) } });
      res.status(200).send({ message: `ID ${id} restaurado.` });
    } catch (err) {
      next(err);
    }
  }

}

module.exports = PessoasController;