/* eslint-disable no-unused-vars */
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("TN_T_PESSOA", [
      {
        id: "345fecb1-cbda-4e72-900b-9800d0bbc463",
        ds_nome: "Gustavo de Souza Fonseca",
        nr_cpf: "51132013836",
        dt_admissao: "2022-09-01",
        dt_nascimento: "2002-11-14",
        tp_contrato: "CLT",
        ds_categoria_cargo: "Administrativo",
        id_login: "f6fa22c0-93cf-42b9-a58b-01c620d1ea93",
        id_login_last_updated: "f6fa22c0-93cf-42b9-a58b-01c620d1ea93",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id: "1a0d1981-7bb4-446f-88f9-751cf8e1e357",
        ds_nome: "Manuel Fernandes Andrade",
        nr_cpf: "12345678911",
        dt_admissao: "2022-11-07",
        dt_nascimento: "1998-05-24",
        tp_contrato: "CLT",
        ds_categoria_cargo: "Administrativo",
        id_login: "f6fa22c0-93cf-42b9-a58b-01c620d1ea93",
        id_login_last_updated: "f6fa22c0-93cf-42b9-a58b-01c620d1ea93",
        dt_created: new Date(),
        dt_updated: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("TN_T_PESSOA", null, {});
  }
};
