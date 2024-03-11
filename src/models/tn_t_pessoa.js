/* eslint-disable indent */
"use strict";
const { v4: uuidv4 } = require("uuid");

const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TN_T_PESSOA extends Model {
    static associate(models) {
      TN_T_PESSOA.belongsTo(models.TN_T_CARGO_SETOR, { foreignKey: "id" });
      TN_T_PESSOA.belongsTo(models.TN_T_SISTEMA_PESSOA, { foreignKey: "id" });
      TN_T_PESSOA.belongsTo(models.TN_T_LOGIN, { foreignKey: "id_login"});
      TN_T_PESSOA.belongsTo(models.TN_T_LOGIN, { foreignKey: "id_login_last_update"});
      TN_T_PESSOA.hasOne(models.TN_T_LOGIN, { foreignKey: "id_pessoa" });
    }
  }
  TN_T_PESSOA.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    ds_nome: DataTypes.STRING,
    nr_cpf: DataTypes.STRING,
    dt_admissao: DataTypes.DATEONLY,
    dt_nascimento: DataTypes.DATEONLY,
    tp_contrato: DataTypes.STRING,
    ds_categoria_cargo: DataTypes.STRING,
  },
  {
    sequelize,
    paranoid: true, //Habilita pelo sequelize o soft delete (deletar suave)
    modelName: "TN_T_PESSOA",
    tableName: "TN_T_PESSOA",
    timestamps: true, // Habilita campos createdAt e updatedAt
    createdAt: "dt_created", // Nome da coluna para data de criação
    updatedAt: "dt_updated", // Nome da coluna para data de atualização
    deletedAt: "dt_deleted", // Nome da coluna para data de desativação
    underscored: true, // Usa o padrão snake_case para os nomes das colunas
  });

  TN_T_PESSOA.afterCreate(async (pessoa, options) => {
    console.log("After create hook triggered for pessoa:", pessoa.id);

    const { TN_AUDIT_PESSOA } = sequelize.models;

    try {
      await TN_AUDIT_PESSOA.create({
        ds_nome: pessoa.ds_nome,
        nr_cpf: pessoa.nr_cpf,
        dt_admissao: pessoa.dt_admissao,
        dt_nascimento: pessoa.dt_nascimento,
        tp_contrato: pessoa.tp_contrato,
        ds_categoria_cargo: pessoa.ds_categoria_cargo,
        ds_action: "create",
        id_login: pessoa.id_login,
        id_login_last_update: pessoa.id_login_last_update, 
        dt_created: pessoa.dt_created,
        dt_updated: pessoa.dt_updated,
      }, { transaction: options.transaction });
  
      console.log("Audit log created successfully.");
    } catch (error) {
      console.error("Error creating audit log:", error);
    }
  });

  TN_T_PESSOA.afterUpdate(async (pessoa, options) => {
    console.log("After update hook triggered for pessoa");
    const { TN_AUDIT_PESSOA } = sequelize.models;
    const transaction = options.transaction || await sequelize.transaction();

    try {
      await TN_AUDIT_PESSOA.create({
        ds_nome: pessoa.ds_nome,
        nr_cpf: pessoa.nr_cpf,
        dt_admissao: pessoa.dt_admissao,
        dt_nascimento: pessoa.dt_nascimento,
        tp_contrato: pessoa.tp_contrato,
        ds_categoria_cargo: pessoa.ds_categoria_cargo,
        ds_action: "update",
        id_login: pessoa.id_login,
        id_login_last_update: pessoa.id_login_last_update, 
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
  
  return TN_T_PESSOA;
};