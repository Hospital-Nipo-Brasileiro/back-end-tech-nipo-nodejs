/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("TN_T_SISTEMA_PESSOA", [
      {
        id_pessoa: "345fecb1-cbda-4e72-900b-9800d0bbc463",
        id_sistema: 1,
        ds_usuario: "gustavo.sfonseca",
        id_login: "f6fa22c0-93cf-42b9-a58b-01c620d1ea93",
        id_login_last_update: "f6fa22c0-93cf-42b9-a58b-01c620d1ea93",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id_pessoa: "345fecb1-cbda-4e72-900b-9800d0bbc463",
        id_sistema: 2,
        ds_usuario: "HC51132013",
        id_login: "f6fa22c0-93cf-42b9-a58b-01c620d1ea93",
        id_login_last_update: "f6fa22c0-93cf-42b9-a58b-01c620d1ea93",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id_pessoa: "1a0d1981-7bb4-446f-88f9-751cf8e1e357",
        id_sistema: 1,
        ds_usuario: "manuel.fernandes",
        id_login: "f6fa22c0-93cf-42b9-a58b-01c620d1ea93",
        id_login_last_update: "f6fa22c0-93cf-42b9-a58b-01c620d1ea93",
        dt_created: new Date(),
        dt_updated: new Date()
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("TN_T_SISTEMA_PESSOA", null, {});
  }
};
