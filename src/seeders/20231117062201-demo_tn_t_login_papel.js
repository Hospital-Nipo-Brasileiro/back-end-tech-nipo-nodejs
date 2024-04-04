/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("TN_T_LOGIN_PAPEL", [
      {
        id_login: "f6fa22c0-93cf-42b9-a58b-01c620d1ea93",
        id_papel: 1,
        dt_created: new Date(),
        dt_updated: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("TN_T_LOGIN_PAPEL", null, {});
  }
};
