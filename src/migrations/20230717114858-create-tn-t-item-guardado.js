"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TN_T_ITEM_GUARDADO", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_item: {
        type: Sequelize.INTEGER,
        references: { model: "TN_T_ITEM", key: "id" }
      },
      id_prateleira: {
        type: Sequelize.INTEGER,
        references: { model: "TN_T_PRATELEIRA", key: "id" }
      },
      id_bau: {
        type: Sequelize.INTEGER,
        references: { model: "TN_T_BAU", key: "id" }
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
  // eslint-disable-next-line no-unused-vars
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("TN_T_ITEM_GUARDADO");
  }
};