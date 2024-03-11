/* eslint-disable indent */
"use strict";
const { v4: uuidv4 } = require("uuid");

const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TN_AUDIT_PESSOA extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {

    }
  }
  TN_AUDIT_PESSOA.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    ds_nome: DataTypes.STRING,
    nr_cpf: DataTypes.STRING,
    dt_admissao: DataTypes.DATEONLY,
    dt_nascimento: DataTypes.DATEONLY,
    tp_contrato: DataTypes.STRING,
    ds_categoria_cargo: DataTypes.STRING,
    ds_action: DataTypes.STRING,
    id_login: DataTypes.STRING, 
    id_login_last_update: DataTypes.STRING, 
    dt_created: DataTypes.DATE, 
    dt_updated: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "TN_AUDIT_PESSOA",
    tableName: "TN_AUDIT_PESSOA",
    timestamps: true, // Habilita campos createdAt e updatedAt
    createdAt: "dt_created", // Nome da coluna para data de criação
    updatedAt: "dt_updated", // Nome da coluna para data de atualização
    underscored: true, // Usa o padrão snake_case para os nomes das colunas
  });
  return TN_AUDIT_PESSOA;
};