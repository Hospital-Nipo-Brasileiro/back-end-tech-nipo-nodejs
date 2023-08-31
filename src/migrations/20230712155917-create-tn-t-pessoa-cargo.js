/* eslint-disable no-unused-vars */
"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TN_T_PESSOA_CARGO", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_pessoa: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "TN_T_PESSOA", key: "id" }
      },
      id_cargo_setor: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "TN_T_CARGO_SETOR", key: "id" }
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
    await queryInterface.dropTable("TN_T_PESSOA_CARGO");
  }
};