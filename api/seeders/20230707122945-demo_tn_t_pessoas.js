module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("TN_T_Pessoas", [
      {
        nome: "Ana Souza",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: "Marcos Cintra",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("TN_T_Pessoas", null, {});
  }
};
