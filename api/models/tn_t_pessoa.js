'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TN_T_Pessoas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TN_T_Pessoas.init({
    ds_nome: DataTypes.STRING,
    nr_cpf: DataTypes.INTEGER,
    dt_admissao: DataTypes.DATEONLY,
    dt_nascimento: DataTypes.DATEONLY,
    tp_contrato: DataTypes.STRING,
    ds_categoria_cargo: DataTypes.STRING,
    dt_created_pessoa: DataTypes.DATE

  }, {
    sequelize,
    modelName: 'TN_T_PESSOA',
  });
  return TN_T_Pessoas;
};