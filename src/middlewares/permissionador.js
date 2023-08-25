const AcessoNaoAutorizado = require("../errors/AcessoNaoAutorizado");

function validaPermissao(permission) {
  return (req, res, next) => {
    const ds_username = req.ds_username;

    if (ds_username && ds_username.roles.includes(permission)) {
      next();
    } else {
      next(new AcessoNaoAutorizado());
    }
  };
}

module.exports = validaPermissao;