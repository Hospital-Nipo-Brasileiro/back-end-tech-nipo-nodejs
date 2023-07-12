/* eslint-disable no-unused-vars */
"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("TN_T_PESSOA", "id_cargo_setor", {
      allowNull: true,
      type: Sequelize.INTEGER
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("TN_T_PESSOA", "id_cargo_setor");
  }
};