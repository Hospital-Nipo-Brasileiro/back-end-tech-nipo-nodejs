/* eslint-disable no-unused-vars */
"use strict";

const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TN_T_PESSOA_CARGO extends Model {
    static associate(models) {
      TN_T_PESSOA_CARGO.belongsTo(models.TN_T_PESSOA, { foreignKey: "id_pessoa" });
      TN_T_PESSOA_CARGO.belongsTo(models.TN_T_CARGO_SETOR, { foreignKey: "id_cargo_setor"});
      TN_T_PESSOA_CARGO.belongsTo(models.TN_T_LOGIN, { foreignKey: "id_login"});
      TN_T_PESSOA_CARGO.belongsTo(models.TN_T_LOGIN, { foreignKey: "id_login_last_updated"});
    }
  }
  TN_T_PESSOA_CARGO.init({
  },
  {
    sequelize,
    paranoid: true, //Habilita pelo sequelize o soft delete (deletar suave)
    modelName: "TN_T_PESSOA_CARGO",
    tableName: "TN_T_PESSOA_CARGO",
    timestamps: true, // Habilita campos createdAt e updatedAt
    createdAt: "dt_created", // Nome da coluna para data de criação
    updatedAt: "dt_updated", // Nome da coluna para data de atualização
    deletedAt: "dt_deleted", // Nome da coluna para data de desativação
    underscored: true, // Usa o padrão snake_case para os nomes das colunas
  });

  TN_T_PESSOA_CARGO.afterCreate(async (pessoa, options) => {
    console.log("After create hook triggered for pessoa:", pessoa.id);

    const { TN_AUDIT_PESSOA } = sequelize.models;

    try {
      await TN_AUDIT_PESSOA.create({
        id_pessoa: pessoa.id_pessoa,
        id_cargo_setor: pessoa.id_cargo_setor,
        ds_action: "create",
        id_login: pessoa.id_login,
        id_login_last_updated: pessoa.id_login_last_updated, 
        dt_created: pessoa.dt_created,
        dt_updated: pessoa.dt_updated,
      }, { transaction: options.transaction });
  
      console.log("Audit log created successfully.");
    } catch (error) {
      console.error("Error creating audit log:", error);
    }
  });

  TN_T_PESSOA_CARGO.afterUpdate(async (pessoa, options) => {
    console.log("After update hook triggered for pessoa");
    const { TN_AUDIT_PESSOA } = sequelize.models;
    const transaction = options.transaction || await sequelize.transaction();

    if(pessoa.dt_deleted !== null) {
      try {
        await TN_AUDIT_PESSOA.create({
          id_pessoa: pessoa.id_pessoa,
          id_cargo_setor: pessoa.id_cargo_setor,
          ds_action: "create",
          id_login: pessoa.id_login,
          id_login_last_updated: pessoa.id_login_last_updated, 
          dt_created: pessoa.dt_created,
          dt_updated: pessoa.dt_updated,
        }, { transaction });
  
        await transaction.commit();
        console.log("Audit log created successfully.");
      } catch (error) {
        if (transaction) await transaction.rollback();
        console.error("Error creating audit log:", error);
      }
    }

    try {
      await TN_AUDIT_PESSOA.create({
        id_pessoa: pessoa.id_pessoa,
        id_cargo_setor: pessoa.id_cargo_setor,
        ds_action: "create",
        id_login: pessoa.id_login,
        id_login_last_updated: pessoa.id_login_last_updated, 
        dt_created: pessoa.dt_created,
        dt_updated: pessoa.dt_updated,
      }, { transaction });

      await transaction.commit();
      console.log("Audit log created successfully.");
    } catch (error) {
      if (transaction) await transaction.rollback();
      console.error("Error creating audit log:", error);
    }
  });
  
  return TN_T_PESSOA_CARGO;
};