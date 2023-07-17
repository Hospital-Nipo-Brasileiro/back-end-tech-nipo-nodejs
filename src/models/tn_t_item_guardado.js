'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TN_T_ITEM_GUARDADO extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
    modelName: 'TN_T_ITEM_GUARDADO',
  });
  return TN_T_ITEM_GUARDADO;
};