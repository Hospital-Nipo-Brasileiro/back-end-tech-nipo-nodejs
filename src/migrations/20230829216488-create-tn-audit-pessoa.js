/* eslint-disable no-unused-vars */
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TN_AUDIT_PESSOA", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable("TN_AUDIT_PESSOA");
  }
};