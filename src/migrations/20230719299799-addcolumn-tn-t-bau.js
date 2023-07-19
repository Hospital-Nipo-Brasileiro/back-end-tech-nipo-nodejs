/* eslint-disable no-unused-vars */
"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("TN_T_BAU", "ds_tipo", {
      allowNull: true,
      type: Sequelize.STRING,
      validate:{
        validateType: function validateType(params) {
          if(params !== "CX" || params !== "EF"){
            throw new Error("A descrição do tipo deve ser ou caixa \"CX\" ou  espaço físico \"EF\" ");
          }
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("TN_T_BAU", "ds_tipo");
  }
};