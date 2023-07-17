"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TN_T_ITEM extends Model {
    static associate(models) {
      TN_T_ITEM.hasMany(models.TN_T_ITEM_GUARDADO, {foreignKey: "id_item"});
    }
  }
  TN_T_ITEM.init({
    ds_nome: DataTypes.STRING,
    ds_modelo: DataTypes.STRING,
    ds_item: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true, //Habilita pelo sequelize o soft delete (deletar suave)
    modelName: "TN_T_ITEM",
    tableName: "TN_T_ITEM",
    timestamps: true, // Habilita campos createdAt e updatedAt
    createdAt: "dt_created", // Nome da coluna para data de criação
    updatedAt: "dt_updated", // Nome da coluna para data de atualização
    deletedAt: "dt_deleted", // Nome da coluna para data de desativação
    underscored: true, // Usa o padrão snake_case para os nomes das colunas
  });
  return TN_T_ITEM;
};