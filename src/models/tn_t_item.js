'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TN_T_ITEM extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TN_T_ITEM.init({
    ds_nome: DataTypes.STRING,
    ds_modelo: DataTypes.STRING,
    ds_item: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TN_T_ITEM',
  });
  return TN_T_ITEM;
};