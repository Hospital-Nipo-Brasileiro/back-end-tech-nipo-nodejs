/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("TN_T_PAPEL_PERMISSAO", [
      {
        id_papel: 1,
        id_permissao: 1,
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id_papel: 1,
        id_permissao: 2,
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id_papel: 1,
        id_permissao: 3,
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id_papel: 1,
        id_permissao: 4,
        dt_created: new Date(),
        dt_updated: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("TN_T_PAPEL_PERMISSAO", null, {});
  }
};
