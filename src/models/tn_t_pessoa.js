"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TN_T_PESSOA extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  TN_T_PESSOA.init({
    ds_nome: DataTypes.STRING,
    nr_cpf: DataTypes.INTEGER,
    dt_admissao: DataTypes.DATEONLY,
    dt_nascimento: DataTypes.DATEONLY,
    tp_contrato: DataTypes.STRING,
    ds_categoria_cargo: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "TN_T_PESSOA",
    tableName: "TN_T_PESSOA",
    timestamps: true, // Habilita campos createdAt e updatedAt
    createdAt: "dt_created", // Nome da coluna para data de criação
    updatedAt: "dt_updated", // Nome da coluna para data de atualização
    underscored: true, // Usa o padrão snake_case para os nomes das colunas
  });
  return TN_T_PESSOA;
};