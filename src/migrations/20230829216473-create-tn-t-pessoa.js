/* eslint-disable no-unused-vars */
"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TN_T_PESSOA", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      ds_nome: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nr_cpf: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dt_admissao: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      dt_nascimento: {
        type: Sequelize.DATEONLY
      },
      tp_contrato: {
        type: Sequelize.STRING
      },
      ds_categoria_cargo: {
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
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("TN_T_PESSOA");
  }
};