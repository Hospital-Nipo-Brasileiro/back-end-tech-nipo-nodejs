/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("TN_T_SISTEMA", [
      {
        ds_nome: "Soul MV",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        ds_nome: "Interact",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        ds_nome: "Rede",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        ds_nome: "Outlook",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        ds_nome: "Email",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        ds_nome: "CWM",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        ds_nome: "Synapse",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        ds_nome: "DeskManager",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        ds_nome: "Exchange Online (Plan 1)",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        ds_nome: "Exchange Online (Plan 2)",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        ds_nome: "Microsoft 365 Apps for Business",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        ds_nome: "Microsoft 365 Business Standard",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        ds_nome: "Microsoft Teams Essencials",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        ds_nome: "Power BI Pro",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        ds_nome: "Project Plan 3",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        ds_nome: "Visio Plan 1",
        dt_created: new Date(),
        dt_updated: new Date()
      },
      {
        ds_nome: "Visio Plan 2",
        dt_created: new Date(),
        dt_updated: new Date()
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("TN_T_SISTEMA", null, {});
  }
};
