"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TN_T_PRATELEIRA extends Model {
    static associate(models) {
      TN_T_PRATELEIRA.belongsTo(models.TN_T_ARMARIO, {foreignKey: "id_armario"});
      TN_T_PRATELEIRA.hasMany(models.TN_T_ITEM_GUARDADO, {foreignKey: "id_prateleira"});
    }
  }
  TN_T_PRATELEIRA.init({
    id_armario: DataTypes.INTEGER,
    ds_nome: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true, //Habilita pelo sequelize o soft delete (deletar suave)
    modelName: "TN_T_PRATELEIRA",
    tableName: "TN_T_PRATELEIRA",
    timestamps: true, // Habilita campos createdAt e updatedAt
    createdAt: "dt_created", // Nome da coluna para data de criação
    updatedAt: "dt_updated", // Nome da coluna para data de atualização
    deletedAt: "dt_deleted", // Nome da coluna para data de desativação
    underscored: true, // Usa o padrão snake_case para os nomes das colunas
  });
  return TN_T_PRATELEIRA;
};