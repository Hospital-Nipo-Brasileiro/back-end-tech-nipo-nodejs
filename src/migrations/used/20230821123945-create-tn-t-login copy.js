
/* eslint-disable no-unused-vars */
"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TN_T_LOGIN", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_pessoa: {
        allowNull: false,
<<<<<<< HEAD:src/migrations/20230821123945-create-tn-t-login.js
        type: Sequelize.INTEGER,
        references: { model: "TN_T_PESSOA", key: "id" }
      },
      ds_nome: {
=======
        type: Sequelize.INTEGER
      },
      ds_username: {
>>>>>>> 858e55b42101b5a18a003fa26c835ac95b8b55d0:src/migrations/used/20230821123945-create-tn-t-login copy.js
        allowNull: false,
        type: Sequelize.STRING,
      },
      ds_email: {
        allowNull: true,
        type: Sequelize.STRING
      },
      ds_password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dt_created: {
        allowNull: false,
        type: Sequelize.DATE
      },
      dt_updated: {
        allowNull: false,
        type: Sequelize.DATE
      },
      dt_deleted: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("TN_T_LOGIN");
  }
};