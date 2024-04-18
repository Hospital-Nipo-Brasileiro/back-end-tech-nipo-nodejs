const NaoEncontrado = require("../errors/NaoEncontrado");
const database = require("../models");

class LoginPapelController {

  static async buscaTodosLoginsPapeis(req, res, next) {
    const loginsPapeisEncontrados = await database.TN_T_LOGIN_PAPEL.findAll();
    try {
      if (loginsPapeisEncontrados.length !== 0) {
        res.status(200).send(loginsPapeisEncontrados);
      } else {
        next(new NaoEncontrado("Nenhum logins-papeis vinculados encontrado"));
      }
    } catch (err) {
      next(err);
    }
  }

  static async buscaLoginPapelPorIdLogin(req, res, next) {
    const { id } = req.params;
    const loginPapelEncontrado = await database.TN_T_LOGIN_PAPEL.findOne({ where: { id: id } });

    try {
      if (!loginPapelEncontrado) {
        next(new NaoEncontrado(`ID ${id} de papel vinculado a permissão não enconstrado`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async vinculaLoginAUmPapel(req, res, next) {
    const { id_login, id_papel } = req.body;

    const novoLoginPapel = {
      id_login,
      id_papel,
      dt_created: new Date(),
      dt_updated: new Date(),
    };

    const loginEncontrado = await database.TN_T_LOGIN.findOne({ where: { id: id_login } });

    try {
      if (loginEncontrado) {
        const papelEncontrado = await database.TN_T_PAPEL.findOne({
          where: { id: novoLoginPapel.id_papel },
        });

        if (papelEncontrado) {
          const loginPapelCriado = await database.TN_T_LOGIN_PAPEL.create(novoLoginPapel);
          res.status(201).send(loginPapelCriado);
        } else {
          next(new NaoEncontrado(`ID ${novoLoginPapel.id_papel} de papel não encontrado`));
        }
      } else {
        next(new NaoEncontrado(`ID ${id_login} de login não encontrado`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async removePapelDeLogin(req, res, next) {
    const { id } = req.params;
    const loginPapelEncontrado = await database.TN_T_LOGIN_PAPEL.findOne({ where: { id: id } });
    try {
      if (loginPapelEncontrado) {
        await database.TN_T_LOGIN_PAPEL.destroy({ where: { id: Number(id) } });
        res.status(200).send({ message: `Papel Permissao de ID ${id} excluído.` });
      } else {
        next(new NaoEncontrado(`ID ${id} de papel permissao não encontrado para excluir.`));
      }
    } catch (err) {
      next(err);
    }
  }

  static async restauraUmLoginPapel(req, res, next) {
    const { id } = req.params;
    try {
      await database.TN_T_LOGIN_PAPEL.restore({ where: { id: Number(id) } });
      res.status(200).send({ message: `ID ${id} restaurado.` });
    } catch (err) {
      next(err);
    }
  }

}

module.exports = LoginPapelController;