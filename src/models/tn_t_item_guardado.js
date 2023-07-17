"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TN_T_ITEM_GUARDADO extends Model {
    static associate(models) {
      TN_T_ITEM_GUARDADO.belongsTo(models.TN_T_BAU, {foreignKey: "id_bau"});
      TN_T_ITEM_GUARDADO.belongsTo(models.TN_T_PRATELEIRA, {foreignKey: "id_prateleira"});
    }
  }
  TN_T_ITEM_GUARDADO.init({
    id_item: DataTypes.INTEGER,
    id_prateleira: DataTypes.INTEGER,
    id_bau: DataTypes.INTEGER,
    qt_item: DataTypes.INTEGER,
    nr_tic: DataTypes.INTEGER,
    nr_patrimonio: DataTypes.INTEGER,
    nr_serie: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true, //Habilita pelo sequelize o soft delete (deletar suave)
    modelName: "TN_T_ITEM_GUARDADO",
    tableName: "TN_T_ITEM_GUARDADO",
    timestamps: true, // Habilita campos createdAt e updatedAt
    createdAt: "dt_created", // Nome da coluna para data de criação
    updatedAt: "dt_updated", // Nome da coluna para data de atualização
    deletedAt: "dt_deleted", // Nome da coluna para data de desativação
    underscored: true, // Usa o padrão snake_case para os nomes das colunas
  });
  return TN_T_ITEM_GUARDADO;
};