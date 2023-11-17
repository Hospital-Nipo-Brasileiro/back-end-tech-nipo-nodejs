/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("TN_T_ARMARIO", [
      {
        id_zona: 1,
        ds_nome: "A-TR",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id_zona: 2,
        ds_nome: "A-TP",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id_zona: 3,
        ds_nome: "A1",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id_zona: 3,
        ds_nome: "A2",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id_zona: 3,
        ds_nome: "A3",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id_zona: 3,
        ds_nome: "A4",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id_zona: 3,
        ds_nome: "A5",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id_zona: 3,
        ds_nome: "A6",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id_zona: 4,
        ds_nome: "A11",
        dt_created: new Date(),
        dt_updated: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("TN_T_ARMARIO", null, {});
  }
};
