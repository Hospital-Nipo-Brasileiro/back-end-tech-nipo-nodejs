/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("TN_T_ZONA", [
      {
        id_estoque: 1,
        ds_nome: "z-temp",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id_estoque: 2,
        ds_nome: "z-temp",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id_estoque: 3,
        ds_nome: "z-a",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id_estoque: 3,
        ds_nome: "z-b",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id_estoque: 4,
        ds_nome: "z-c",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id_estoque: 4,
        ds_nome: "z-d",
        dt_created: new Date(),
        dt_updated: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("TN_T_ZONA", null, {});
  }
};
