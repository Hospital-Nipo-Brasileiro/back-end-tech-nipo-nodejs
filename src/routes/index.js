const express = require("express");
const pessoas = require("./PessoasRoute.js");
const cargos = require("./CargoRoute.js");
const setores = require("./SetorRoute.js");
const sistemas = require("./SistemasRoute.js");
const cargoSetor = require("./CargoSetorRoute.js");
/* 
  const estoques = require("./EstoqueRoute.js");
  const zonas = require("./ZonaRoute.js");
  const armarios = require("./ArmarioRoute.js");
  const prateleiras = require("./PrateleirasRoute.js");
  const baus = require("./BauRoute.js");
  const itens = require("./ItemRoute.js");
  const itemGuardado = require("./ItemGuardadoRoute.js");
*/
const admissaoCSV = require("./AdmissaoRoute.js");
const login = require("./LoginRoute.js");
const papeis = require("./papelRoute.js");
const permissao = require("./permissaoRoute.js");
const papeisPermissoes = require("./PapelPermissaoRoute.js");
const loginPapel = require("./LoginPapelRoute.js");
const sistemaPessoa = require("./SistemaPessoaRoute.js");
const movimentacaoRegistros = require("./MovimentacaoRegistrosRoute.js");

const routes = (app) => {
  app.use(
    express.json(),
    express.Router("/", (req, res) => { res.status(200).send("TechNipo"); }),
    pessoas,
    cargos,
    setores,
    sistemaPessoa,
    sistemas,
    cargoSetor,
    /*
      estoques,
      zonas,
      armarios,
      prateleiras,
      baus,
      itens,
      itemGuardado, 
    */
    admissaoCSV,
    login,
    papeis,
    permissao,
    papeisPermissoes,
    loginPapel,
    movimentacaoRegistros
  );
};

module.exports = routes;