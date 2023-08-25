/* eslint-disable no-unused-vars */
"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("TN_T_LOGIN", "dt_deleted", {
      allowNull: true,
      type: Sequelize.DATE
    });
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("TN_T_LOGIN", "dt_deleted");
  }
};