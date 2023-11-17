/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("TN_T_ESTOQUE", [
      {
        ds_nome: "TI",
        ds_estoque: "Estoque temporário de triagem, sem espaço físico",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        ds_nome: "TEMP",
        ds_estoque: "Estoque temporário da sala da T.I.",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        ds_nome: "TRIAGEM",
        ds_estoque: "Estoque temporário de triagem, sem espaço físico",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        ds_nome: "CENTRAL",
        ds_estoque: "Estoque Central para itens diversos",
        dt_created: new Date(),
        dt_updated: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("TN_T_ESTOQUE", null, {});
  }
};
