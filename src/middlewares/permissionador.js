const AcessoNaoAutorizado = require("../errors/AcessoNaoAutorizado");
const database = require("../models");

const validaPermissao = (permission) => {
  return async (req, res, next) => {
    const userId = req.userId;

    try {
      const existePermissao = await database.TN_T_LOGIN_PAPEL.findAll({
        where: { id_login: Number(userId) },
        include: [
          {
            model: database.TN_T_PAPEL,
            include: [
              {
                model: database.TN_T_PAPEL_PERMISSAO,
                include: [{
                  model: database.TN_T_PERMISSAO,
                  where: { ds_nome: permission },
                }],
              },
            ],
          },
        ],
      });

      if (existePermissao.length > 0) {
        return next();
      } else {
        return next(new AcessoNaoAutorizado());
      }
    } catch (err) {
      return next(err);
    }
  };
};

module.exports = validaPermissao;
