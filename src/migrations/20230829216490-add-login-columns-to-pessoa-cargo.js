/* eslint-disable no-unused-vars */
"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("TN_T_PESSOA_CARGO", "id_login", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "TN_T_LOGIN",
        key: "id"
      }
    });

    await queryInterface.addColumn("TN_T_PESSOA_CARGO", "id_login_last_updated", {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "TN_T_LOGIN",
        key: "id"
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("TN_T_PESSOA_CARGO", "id_login");
    await queryInterface.removeColumn("TN_T_PESSOA_CARGO", "id_login_last_updated");
  }
};
