"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TN_T_ESTOQUE extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TN_T_ESTOQUE.hasMany(models.TN_T_ZONA, {foreignKey: "id_estoque"});
    }
  }
  TN_T_ESTOQUE.init({
    ds_nome: DataTypes.STRING,
    ds_estoque: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true, //Habilita pelo sequelize o soft delete (deletar suave)
    modelName: "TN_T_ESTOQUE",
    tableName: "TN_T_ESTOQUE",
    timestamps: true, // Habilita campos createdAt e updatedAt
    createdAt: "dt_created", // Nome da coluna para data de criação
    updatedAt: "dt_updated", // Nome da coluna para data de atualização
    deletedAt: "dt_deleted", // Nome da coluna para data de desativação
    underscored: true, // Usa o padrão snake_case para os nomes das colunas
  });
  return TN_T_ESTOQUE;
};