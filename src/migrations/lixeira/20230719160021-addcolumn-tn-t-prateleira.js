/* eslint-disable no-unused-vars */
"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("TN_T_PRATELEIRA", "ds_nome", {
      allowNull: true,
      type: Sequelize.STRING
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("TN_T_PRATELEIRA", "ds_nome");
  }
};