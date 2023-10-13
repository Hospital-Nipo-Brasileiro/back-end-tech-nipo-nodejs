"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TN_T_BAU extends Model {
    static associate(models) {
      TN_T_BAU.belongsTo(models.TN_T_ZONA, { foreignKey: "id_zona" });
      TN_T_BAU.hasMany(models.TN_T_ITEM_GUARDADO, { foreignKey: "id_bau" });
    }
  }
  TN_T_BAU.init({
    id_zona: DataTypes.INTEGER,
    ds_nome: DataTypes.STRING,
    ds_tipo: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {
    sequelize,
    paranoid: true, //Habilita pelo sequelize o soft delete (deletar suave)
    modelName: "TN_T_BAU",
    tableName: "TN_T_BAU",
    timestamps: true, // Habilita campos createdAt e updatedAt
    createdAt: "dt_created", // Nome da coluna para data de criação
    updatedAt: "dt_updated", // Nome da coluna para data de atualização
    deletedAt: "dt_deleted", // Nome da coluna para data de desativação
    underscored: true, // Usa o padrão snake_case para os nomes das colunas
  });
  return TN_T_BAU;
};