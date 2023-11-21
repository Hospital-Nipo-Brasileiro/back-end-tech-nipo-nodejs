/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("TN_T_PESSOA_CARGO", [
      {
        id_pessoa: 1,
        id_cargo_setor: 1,
        dt_created: new Date(),
        dt_updated: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("TN_T_PESSOA_CARGO", null, {});
  }
};
