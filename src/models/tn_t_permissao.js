"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TN_T_PERMISSAO extends Model {
    static associate(models) {
      TN_T_PERMISSAO.belongsTo(models.TN_T_PAPEL_PERMISSAO, {foreignKey: "id"});
    }
  }
  TN_T_PERMISSAO.init({
    ds_nome: DataTypes.STRING,
    ds_descricao: DataTypes.STRING,
  }, {
    sequelize,
    paranoid: true, //Habilita pelo sequelize o soft delete (deletar suave)
    modelName: "TN_T_PERMISSAO",
    tableName: "TN_T_PERMISSAO",
    timestamps: true, // Habilita campos createdAt e updatedAt
    createdAt: "dt_created", // Nome da coluna para data de criação
    updatedAt: "dt_updated", // Nome da coluna para data de atualização
    deletedAt: "dt_deleted", // Nome da coluna para data de desativação
    underscored: true, // Usa o padrão snake_case para os nomes das colunas
  });
  return TN_T_PERMISSAO;
};