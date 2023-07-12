/* eslint-disable no-unused-vars */
"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TN_T_CARGO_SETOR extends Model {
    static associate(models) {
      
    }
  }
  TN_T_CARGO_SETOR.init({
    nm: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: "TN_T_CARGO_SETOR",
    tableName: "TN_T_CARGO_SETOR",
    timestamps: true, // Habilita campos createdAt e updatedAt
    createdAt: "dt_created", // Nome da coluna para data de criação
    updatedAt: "dt_updated", // Nome da coluna para data de atualização
    deletedAt: "dt_deleted", // Nome da coluna para data de desativação
    underscored: true, // Usa o padrão snake_case para os nomes das colunas
  });
  return TN_T_CARGO_SETOR;
};