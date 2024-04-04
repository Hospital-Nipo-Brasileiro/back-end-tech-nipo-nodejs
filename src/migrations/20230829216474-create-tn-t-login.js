/* eslint-disable no-unused-vars */
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TN_T_LOGIN", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      id_pessoa: {
        allowNull: true,
        type: Sequelize.UUID,
        references: { model: "TN_T_PESSOA", key: "id" }
      },
      ds_username: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      ds_email: {
        allowNull: true,
        type: Sequelize.STRING
      },
      ds_password: {
        allowNull: false,
        type: Sequelize.STRING
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