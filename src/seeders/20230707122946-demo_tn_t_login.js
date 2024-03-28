/* eslint-disable no-unused-vars */
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("TN_T_LOGIN", [
      {
        id: "00000000-0000-0000-0000-000000000000",
        ds_username: "admin",
        ds_email: "suporte@hnipo.org.br",
        ds_password: bcrypt.hashSync("vLlTnS8%UbPP8lM%", 10),
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id: "f6fa22c0-93cf-42b9-a58b-01c620d1ea93",
        ds_username: "HC51132013",
        ds_email: "gustavo.fonseca@hnipo.org.br",
        ds_password: bcrypt.hashSync("Hospital@2023", 10),
        id_login: "00000000-0000-0000-0000-000000000000",
        id_login_last_updated: "00000000-0000-0000-0000-000000000000",
        dt_created: new Date(),
        dt_updated: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("TN_T_LOGIN", null, {});
  }
};
