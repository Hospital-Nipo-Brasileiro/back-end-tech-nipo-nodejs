/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("TN_T_LOGIN_PAPEL", [
      {
        id_login: 1,
        id_papel_permissao: 1,
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id_login: 1,
        id_papel_permissao: 2,
        dt_created: new Date(),
        dt_updated: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("TN_T_LOGIN_PAPEL", null, {});
  }
};
