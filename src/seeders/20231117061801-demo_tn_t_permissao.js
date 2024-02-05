/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("TN_T_PERMISSAO", [
      {
        ds_nome: "R-ADMIN",
        ds_descricao: "Permite a leitura de logins",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        ds_nome: "W-ADMIN",
        ds_descricao: "Permite a criação de login",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        ds_nome: "U-ADMIN",
        ds_descricao: "Permite a atualização de login",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        ds_nome: "D-ADMIN",
        ds_descricao: "Permite deletar login",
        dt_created: new Date(),
        dt_updated: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("TN_T_PERMISSAO", null, {});
  }
};
