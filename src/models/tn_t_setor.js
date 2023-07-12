/* eslint-disable no-unused-vars */
"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TN_T_SETOR extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TN_T_SETOR.init({
    ds_nome: DataTypes.STRING,
    sg_local: {
      type: DataTypes.STRING,
      validate:{
        typeChar: function(dado) {
          if(dado.length > 4) {
            throw new Error(`A sigla do local ${dado} é maior que 4 caracteres`);
          }
        }
      }
    },
    ds_local: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: "TN_T_SETOR",
    tableName: "TN_T_SETOR",
    timestamps: true, // Habilita campos createdAt e updatedAt
    createdAt: "dt_created", // Nome da coluna para data de criação
    updatedAt: "dt_updated", // Nome da coluna para data de atualização
    deletedAt: "dt_deleted", // Nome da coluna para data de desativação
    underscored: true, // Usa o padrão snake_case para os nomes das colunas
  });
  return TN_T_SETOR;
};