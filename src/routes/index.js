const express = require("express");
const pessoas = require("./PessoasRoute.js");
const cargos = require("./CargoRoute.js");
const setores = require("./SetorRoute.js");
const sistemas = require("./SistemasRoute.js");
const cargoSetor = require("./CargoSetorRoute.js");
const estoques = require("./EstoqueRoute.js");
const zonas = require("./ZonaRoute.js");

const routes = (app) => {
  app.use(
    express.json(),
    express.Router("/", (req, res) => {res.status(200).json("TechNipo");}),
    pessoas,
    cargos,
    setores,
    sistemas,
    cargoSetor,
    estoques,
    zonas
  );
};

module.exports = routes;