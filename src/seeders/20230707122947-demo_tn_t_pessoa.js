/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("TN_T_PESSOA", [
      {
        ds_nome: "Gustavo de Souza Fonseca",
        nr_cpf: "51132013836",
        dt_admissao: "2022-09-01",
        dt_nascimento: "2002-11-14",
        tp_contrato: "CLT",
        ds_categoria_cargo: "Administrativo",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        ds_nome: "Manuel Fernandes Andrade",
        nr_cpf: "12345678911",
        dt_admissao: "2022-11-07",
        dt_nascimento: "1998-05-24",
        tp_contrato: "CLT",
        ds_categoria_cargo: "Administrativo",
        dt_created: new Date(),
        dt_updated: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("TN_T_PESSOA", null, {});
  }
};
