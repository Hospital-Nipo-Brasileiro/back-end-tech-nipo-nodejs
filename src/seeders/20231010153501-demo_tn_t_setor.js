/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("TN_T_SETOR", [
      {
        ds_nome: "Tecnologia da Informação",
        sg_local: "TIC",
        ds_local: "casa 16",
        ds_email_cordenacao: "rodrigo.rios@hnipo.org.br",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        ds_nome: "Call Center",
        sg_local: "CAL",
        ds_local: "casa 16",
        ds_email_cordenacao: "aline.barion@hnipo.org.br",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        ds_nome: "SAME",
        sg_local: "SME",
        ds_local: "casa 16",
        ds_email_cordenacao: "arlete.salles@hnipo.org.br",
        dt_created: new Date(),
        dt_updated: new Date()
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("TN_T_SETOR", null, {});
  }
};
