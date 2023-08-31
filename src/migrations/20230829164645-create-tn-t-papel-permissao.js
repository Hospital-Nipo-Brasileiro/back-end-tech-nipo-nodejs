/* eslint-disable no-unused-vars */
"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TN_T_PAPEL_PERMISSAO", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_papel: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: "TN_T_PAPEL", key: "id"}
      },
      id_permissao: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: "TN_T_PERMISSAO", key: "id"}
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
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("TN_T_PAPEL_PERMISSAO");
  }
};