/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("TN_T_ITEM", [
      {
        ds_nome: "Fone de Ouvido",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        ds_nome: "Mouse dell",
        dt_created: new Date(),
        dt_updated: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("TN_T_ITEM", null, {});
  }
};
