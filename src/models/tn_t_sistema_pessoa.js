/* eslint-disable no-unused-vars */
"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TN_T_SISTEMA_PESSOA extends Model {
    static associate(models) {
      TN_T_SISTEMA_PESSOA.hasMany(models.TN_T_PESSOA, {foreignKey: "id_pessoa"});
      TN_T_SISTEMA_PESSOA.hasMany(models.TN_T_SISTEMA, {foreignKey: "id_sistema"});
    }
  }
  TN_T_SISTEMA_PESSOA.init({
    ds_usuario: DataTypes.STRING,
    ds_senha: DataTypes.STRING
  }, 
  {
    sequelize,
    paranoid: true,
    modelName: "TN_T_SISTEMA_PESSOA",
    tableName: "TN_T_SISTEMA_PESSOA",
    timestamps: true, // Habilita campos createdAt e updatedAt
    createdAt: "dt_created", // Nome da coluna para data de criação
    updatedAt: "dt_updated", // Nome da coluna para data de atualização
    deletedAt: "dt_deleted", // Nome da coluna para data de desativação
    underscored: true, // Usa o padrão snake_case para os nomes das colunas
  });
  return TN_T_SISTEMA_PESSOA;
};