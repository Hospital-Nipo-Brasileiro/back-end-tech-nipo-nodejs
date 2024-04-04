/* eslint-disable no-unused-vars */
"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TN_T_SISTEMA_PESSOA extends Model {
    static associate(models) {
      TN_T_SISTEMA_PESSOA.belongsTo(models.TN_T_PESSOA, { foreignKey: "id_pessoa" });
      TN_T_SISTEMA_PESSOA.belongsTo(models.TN_T_SISTEMA, { foreignKey: "id_sistema" });
      TN_T_SISTEMA_PESSOA.belongsTo(models.TN_T_LOGIN, { foreignKey: "id_login"});
      TN_T_SISTEMA_PESSOA.belongsTo(models.TN_T_LOGIN, { foreignKey: "id_login_last_updated"});
    }
  }
  TN_T_SISTEMA_PESSOA.init({
    ds_usuario: DataTypes.STRING,
    ds_senha: DataTypes.STRING
  },
  {
    sequelize,
    paranoid: true, //Habilita pelo sequelize o soft delete (deletar suave)
    modelName: "TN_T_SISTEMA_PESSOA",
    tableName: "TN_T_SISTEMA_PESSOA",
    timestamps: true, // Habilita campos createdAt e updatedAt
    createdAt: "dt_created", // Nome da coluna para data de criação
    updatedAt: "dt_updated", // Nome da coluna para data de atualização
    deletedAt: "dt_deleted", // Nome da coluna para data de desativação
    underscored: true, // Usa o padrão snake_case para os nomes das colunas
  });

  TN_T_SISTEMA_PESSOA.afterCreate(async (sistema_pessoa, options) => {
    console.log("After create hook triggered for sistem_pessoa:", sistema_pessoa.id);

    const { TN_AUDIT_SISTEMA_PESSOA } = sequelize.models;

    try {
      await TN_AUDIT_SISTEMA_PESSOA.create({
        id_pessoa: sistema_pessoa.id_pessoa,
        id_sistema: sistema_pessoa.id_sistema,
        ds_usuario: sistema_pessoa.ds_usuario,
        ds_senha: sistema_pessoa.ds_senha,
        ds_usuario_copia: sistema_pessoa.ds_usuario_copia,
        ds_action: "create",
        id_login: sistema_pessoa.id_login,
        id_login_last_updated: sistema_pessoa.id_login_last_updated, 
        dt_created: sistema_pessoa.dt_created,
        dt_updated: sistema_pessoa.dt_updated,
      }, { transaction: options.transaction });
  
      console.log("Audit log created successfully.");
    } catch (error) {
      console.error("Error creating audit log:", error);
    }
  });

  TN_T_SISTEMA_PESSOA.afterUpdate(async (sistema_pessoa, options) => {
    console.log("After update hook triggered for sistem_pessoa");
    const { TN_AUDIT_SISTEMA_PESSOA } = sequelize.models;
    const transaction = options.transaction || await sequelize.transaction();

    if(sistema_pessoa.dt_deleted !== null) {
      try {
        await TN_AUDIT_SISTEMA_PESSOA.create({
          id_pessoa: sistema_pessoa.id_pessoa,
          id_sistema: sistema_pessoa.id_sistema,
          ds_usuario: sistema_pessoa.ds_usuario,
          ds_senha: sistema_pessoa.ds_senha,
          ds_usuario_copia:sistema_pessoa.ds_usuario_copia,
          ds_action: "delete",
          dt_created: sistema_pessoa.dt_created,
          dt_updated: sistema_pessoa.dt_deleted,
        }, { transaction });
  
        await transaction.commit();
        console.log("Audit log created successfully.");
      } catch (error) {
        if (transaction) await transaction.rollback();
        console.error("Error creating audit log:", error);
      }
    }

    try {
      await TN_AUDIT_SISTEMA_PESSOA.create({
        id_pessoa: sistema_pessoa.id_pessoa,
        id_sistema: sistema_pessoa.id_sistema,
        ds_usuario: sistema_pessoa.ds_usuario,
        ds_senha: sistema_pessoa.ds_senha,
        ds_usuario_copia: sistema_pessoa.ds_usuario_copia,
        ds_action: "update",
        dt_created: sistema_pessoa.dt_created,
        dt_updated: sistema_pessoa.dt_updated,
      }, { transaction });

      await transaction.commit();
      console.log("Audit log created successfully.");
    } catch (error) {
      if (transaction) await transaction.rollback();
      console.error("Error creating audit log:", error);
    }
  });

  return TN_T_SISTEMA_PESSOA;
};