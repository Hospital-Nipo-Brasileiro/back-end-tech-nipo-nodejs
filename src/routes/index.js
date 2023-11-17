const express = require("express");
const pessoas = require("./PessoasRoute.js");
const cargos = require("./CargoRoute.js");
const setores = require("./SetorRoute.js");
const sistemas = require("./SistemasRoute.js");
const cargoSetor = require("./CargoSetorRoute.js");
const admissaoCSV = require("./AdmissaoRoute.js");
const login = require("./LoginRoute.js");
const papeis = require("./papelRoute.js");
const permissao = require("./permissaoRoute.js");
const papeisPermissoes = require("./PapelPermissaoRoute.js");
const loginPapel = require("./LoginPapelRoute.js");

const routes = (app) => {
  app.use(
    express.json(),
    express.Router("/", (req, res) => { res.status(200).send("TechNipo"); }),
    pessoas,
    cargos,
    setores,
    sistemas,
    cargoSetor,
    admissaoCSV,
    login,
    papeis,
    permissao,
    papeisPermissoes,
    loginPapel
  );
};

module.exports = routes;