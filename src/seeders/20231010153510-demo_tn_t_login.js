/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("TN_T_LOGIN", [
      {
        id_pessoa: 1,
        ds_username: "gusta",
        ds_email: "gustavo.fonseca@hnipo.org.br",
        ds_password: "123",
        dt_created: new Date(),
        dt_updated: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("TN_T_LOGIN", null, {});
  }
};