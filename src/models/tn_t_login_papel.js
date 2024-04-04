/* eslint-disable no-unused-vars */
"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TN_T_LOGIN_PAPEL extends Model {
    static associate(models) {
      TN_T_LOGIN_PAPEL.belongsTo(models.TN_T_LOGIN, {foreignKey: "id_login"});
      TN_T_LOGIN_PAPEL.belongsTo(models.TN_T_PAPEL, {foreignKey: "id_papel"});
    }
  }
  TN_T_LOGIN_PAPEL.init({
  },
  {
    sequelize,
    paranoid: true, //Habilita pelo sequelize o soft delete (deletar suave)
    modelName: "TN_T_LOGIN_PAPEL",
    tableName: "TN_T_LOGIN_PAPEL",
    timestamps: true, // Habilita campos createdAt e updatedAt
    createdAt: "dt_created", // Nome da coluna para data de criação
    updatedAt: "dt_updated", // Nome da coluna para data de atualização
    deletedAt: "dt_deleted", // Nome da coluna para data de desativação
    underscored: true, // Usa o padrão snake_case para os nomes das colunas
  });
  return TN_T_LOGIN_PAPEL;
};