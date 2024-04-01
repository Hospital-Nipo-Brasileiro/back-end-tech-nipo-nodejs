/* eslint-disable indent */
"use strict";

const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TN_AUDIT_SISTEMA_PESSOA extends Model {
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      TN_AUDIT_SISTEMA_PESSOA.belongsTo(models.TN_T_PESSOA, { foreignKey: "id_pessoa" });
      TN_AUDIT_SISTEMA_PESSOA.belongsTo(models.TN_T_SISTEMA, { foreignKey: "id_sistema" });
    }
  }
  TN_AUDIT_SISTEMA_PESSOA.init({
    ds_usuario: DataTypes.STRING,
    ds_senha: DataTypes.STRING,
    ds_usuario_copia: DataTypes.STRING,
    ds_action: DataTypes.STRING,
    dt_created: DataTypes.DATE, 
    dt_updated: DataTypes.DATE,
    id_login: DataTypes.STRING,
    id_login_last_updated: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "TN_AUDIT_SISTEMA_PESSOA",
    tableName: "TN_AUDIT_SISTEMA_PESSOA",
    timestamps: true, // Habilita campos createdAt e updatedAt
    createdAt: "dt_created", // Nome da coluna para data de criação
    updatedAt: "dt_updated", // Nome da coluna para data de atualização
    underscored: true, // Usa o padrão snake_case para os nomes das colunas
  });
  return TN_AUDIT_SISTEMA_PESSOA;
};