'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TN_T_ITEM_GUARDADOs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_item: {
        type: Sequelize.INTEGER
      },
      id_prateleira: {
        type: Sequelize.INTEGER
      },
      id_bau: {
        type: Sequelize.INTEGER
      },
      qt_item: {
        type: Sequelize.INTEGER
      },
      nr_tic: {
        type: Sequelize.INTEGER
      },
      nr_patrimonio: {
        type: Sequelize.INTEGER
      },
      nr_serie: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TN_T_ITEM_GUARDADOs');
  }
};