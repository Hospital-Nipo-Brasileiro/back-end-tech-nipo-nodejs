'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TN_T_CARGO', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ds_nome: {
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
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TN_T_CARGO');
  }
};