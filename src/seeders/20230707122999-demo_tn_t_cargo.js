/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("TN_T_CARGO", [
      {
        ds_nome: "Técnico de Suporte de TI",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        ds_nome: "Analista de Suporte de TI",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        ds_nome: "Analista de Infraestrutura JR.",
        dt_created: new Date(),
        dt_updated: new Date()
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("TN_T_CARGO", null, {});
  }
};
