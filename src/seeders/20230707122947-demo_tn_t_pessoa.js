/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("TN_T_PESSOA", [
      {
        ds_nome: "Gustavo de Souza Fonseca",
        nr_cpf: "51132013836",
        dt_admissao: "09/01/2022",
        dt_nascimento: "11/14/2002",
        tp_contrato: "CLT",
        ds_categoria_cargo: "Administrativo",
        dt_created: new Date(),
        dt_updated: new Date()
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("TN_T_PESSOA", null, {});
  }
};
