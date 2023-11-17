const AcessoNaoAutorizado = require("../errors/AcessoNaoAutorizado");
const database = require("../models");

const validaPermissao = (permission) =>  {
  return async (req, res, next) => {
    const userId = req.userId;

    try {
      const existePermissao = await database.TN_T_LOGIN_PAPEL.findOne({ 
        where : {
          id_login: userId,
          "$TN_T_PAPEL_PERMISSAO.TN_T_PERMISSAO.ds_nome$": permission,
        },
        include: [{
          model: database.TN_T_PAPEL_PERMISSAO,
          include: [database.TN_T_PERMISSAO],
        }],
      });

      if (existePermissao) {
        return;
      } else {
        next(new AcessoNaoAutorizado());
      }
    } catch (err) {
      next(err);
    }
  };
};

module.exports = validaPermissao;