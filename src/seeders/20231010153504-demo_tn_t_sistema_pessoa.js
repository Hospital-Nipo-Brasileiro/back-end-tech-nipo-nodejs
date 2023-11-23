/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("TN_T_SISTEMA_PESSOA", [
      {
        id_pessoa: 1,
        id_sistema: 1,
        ds_usuario: "gustavo.sfonseca",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id_pessoa: 1,
        id_sistema: 2,
        ds_usuario: "HC51132013",
        dt_created: new Date(),
        dt_updated: new Date()
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("TN_T_SISTEMA_PESSOA", null, {});
  }
};
