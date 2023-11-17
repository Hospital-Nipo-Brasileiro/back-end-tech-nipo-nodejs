/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("TN_T_ITEM_GUARDADO", [
      {
        id_item: 1,
        id_prateleira: 1,
        qt_item: 2,
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id_item: 2,
        id_prateleira: 2,
        qt_item: 2,
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id_item: 1,
        id_prateleira: 3,
        qt_item: 4,
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        id_item: 2,
        id_prateleira: 3,
        qt_item: 7,
        dt_created: new Date(),
        dt_updated: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("TN_T_ITEM_GUARDADO", null, {});
  }
};
