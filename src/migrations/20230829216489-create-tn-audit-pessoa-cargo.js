/* eslint-disable no-unused-vars */
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TN_AUDIT_PESSOA_CARGO", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_pessoa: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      id_cargo_setor: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      ds_action: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      id_login: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      id_login_last_updated: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      dt_created: {
        allowNull: false,
        type: Sequelize.DATE
      },
      dt_updated: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("TN_AUDIT_PESSOA_CARGO");
  }
};