"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TN_T_PESSOA extends Model {
    static associate(models) {
      TN_T_PESSOA.belongsTo(models.TN_T_CARGO_SETOR, { foreignKey: "id" });
      TN_T_PESSOA.belongsTo(models.TN_T_SISTEMA_PESSOA, { foreignKey: "id" });
      TN_T_PESSOA.hasOne(models.TN_T_LOGIN, { foreignKey: "id" });
    }
  }
  TN_T_PESSOA.init({
    ds_nome: DataTypes.STRING,
    nr_cpf: DataTypes.STRING,
    dt_admissao: DataTypes.DATEONLY,
    dt_nascimento: DataTypes.DATEONLY,
    tp_contrato: DataTypes.STRING,
    ds_categoria_cargo: DataTypes.STRING,
    id_cargo_setor: DataTypes.INTEGER,
  },
    {
      sequelize,
      paranoid: true, //Habilita pelo sequelize o soft delete (deletar suave)
      modelName: "TN_T_PESSOA",
      tableName: "TN_T_PESSOA",
      timestamps: true, // Habilita campos createdAt e updatedAt
      createdAt: "dt_created", // Nome da coluna para data de criação
      updatedAt: "dt_updated", // Nome da coluna para data de atualização
      deletedAt: "dt_deleted", // Nome da coluna para data de desativação
      underscored: true, // Usa o padrão snake_case para os nomes das colunas
    });
  return TN_T_PESSOA;
};