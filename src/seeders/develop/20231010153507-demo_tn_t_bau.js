/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("TN_T_BAU", [
      {
        id_zona: 1,
        ds_tipo: "CX",
        ds_nome: "CX-TR",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id_zona: 2,
        ds_tipo: "CX",
        ds_nome: "CX-TP",
        dt_created: new Date(),
        dt_updated: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("TN_T_BAU", null, {});
  }
};
