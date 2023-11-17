/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("TN_T_PRATELEIRA", [
      {
        id_armario: 1,
        ds_nome: "P-TR",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id_armario: 2,
        ds_nome: "P-TP",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id_armario: 3,
        ds_nome: "P1",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id_armario: 3,
        ds_nome: "P2",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id_armario: 3,
        ds_nome: "P3",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id_armario: 3,
        ds_nome: "P4",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id_armario: 3,
        ds_nome: "P5",
        dt_created: new Date(),
        dt_updated: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("TN_T_PRATELEIRA", null, {});
  }
};
