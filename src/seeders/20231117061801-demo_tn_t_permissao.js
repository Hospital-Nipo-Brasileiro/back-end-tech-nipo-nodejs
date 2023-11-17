/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("TN_T_PERMISSAO", [
      {
        ds_nome: "leitura-estoque",
        ds_descricao: "Permite a leitura de estoques",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        ds_nome: "criacao-estoque",
        ds_descricao: "Permite a criação de estoques",
        dt_created: new Date(),
        dt_updated: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("TN_T_PERMISSAO", null, {});
  }
};
